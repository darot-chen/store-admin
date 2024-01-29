<template>
  <div class="flex h-full flex-col gap-5 px-2" @scroll="handleScroll">
    <button
      class="rounded bg-[#50a7ea] p-2 text-center font-bold text-[#0d2744] shadow-md hover:bg-[#87c1f2] focus:bg-[#87c1f2]"
      @click="onChangeType"
    >
      {{
        roomType === "public" ? $t("switch_to_private") : $t("switch_to_public")
      }}
    </button>
    <div
      v-if="loading"
      class="absolute"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
    >
      <div
        class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500"
      />
    </div>
    <div v-else class="flex flex-col gap-2">
      <NuxtLink
        v-for="room in chatRooms"
        :key="room.id"
        class="flex max-h-[200px] cursor-pointer flex-col justify-between rounded-md border bg-slate-200 p-5 shadow-xl"
        :to="`/room/chat/${room.id}`"
      >
        <div class="flex flex-col">
          <div>
            <h1 class="line-clamp-1 text-lg font-bold">
              {{ room.business.title }}
            </h1>
            <p class="line-clamp-3 text-sm">
              {{ room.business.description }}
            </p>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-4 text-xs italic">
          <span>{{ $t("total_fund") }} {{ room.business.total_fund }}</span>
          <span>
            {{ $t("available_fund") }} {{ room.business.available_fund }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPublicChatRoom } from "~/api/chat";
import type { ChatRoom } from "~/types/chatRoom";

const roomType = ref<string>("public");

const chatRooms = ref<ChatRoom[]>([]);
const lastItemId = ref<number>(0);
const loadMore = ref<boolean>(true);
const loading = ref<boolean>(false);
const firstLoad = ref<boolean>(false);

onMounted(() => {
  fetchChatRooms();
});

async function fetchChatRooms(isChangeType?: boolean) {
  if (firstLoad.value) {
    loading.value = true;
    firstLoad.value = false;
  }

  if (isChangeType) {
    chatRooms.value = [];
    lastItemId.value = 0;
  }

  const res = await getPublicChatRoom(roomType.value, {
    last: lastItemId.value,
    limit: 10,
  });

  chatRooms.value.push(...res.results);
  lastItemId.value = res.results[res.results.length - 1].id;
  loadMore.value = res.meta.has_next;

  loading.value = false;
}

function onChangeType() {
  roomType.value === "public"
    ? (roomType.value = "private")
    : (roomType.value = "public");

  fetchChatRooms(true);
}

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement; // Type casting to HTMLElement
  const { scrollTop, clientHeight, scrollHeight } = target;

  setTimeout(() => {
    if (scrollTop + clientHeight >= scrollHeight) {
      if (loadMore.value) {
        fetchChatRooms();
      }
    }
  }, 300);
};
</script>
