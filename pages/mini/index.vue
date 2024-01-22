<template>
  <div>
    <div
      class="flex max-h-[100vh] flex-col gap-y-[10px] overflow-scroll px-2 sm:px-0"
      @scroll="handleScroll"
    >
      <div
        class="text-primary cursor-pointer rounded border bg-[#FE863F] p-2 text-center"
        @click="onChangeType"
      >
        {{
          roomType === "public"
            ? $t("switch_to_private")
            : $t("switch_to_public")
        }}
      </div>
      <div
        v-if="loading"
        class="absolute"
        style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
      >
        <div
          class="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"
        ></div>
      </div>
      <div
        v-for="room in chatRooms"
        v-else
        :key="room.id"
        class="flex max-h-[200px] cursor-pointer justify-between rounded-md bg-slate-400 p-5"
        @click="navigateTo(`/mini/chat/${room.id}`)"
      >
        <div class="flex gap-x-[10px]">
          <!-- <img
            class="h-[50px] w-[50px] rounded"
            src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            alt=""
          /> -->
          <div class="flex flex-col">
            <span class="text-base font-bold">{{ room.business.title }} </span>
            <span class="text-sm">{{ room.business.description }}</span>
          </div>
        </div>
        <div class="flex flex-col text-xs">
          <span>{{ $t("total_fund") }} {{ room.business.total_fund }}</span>
          <span>
            {{ $t("available_fund") }} {{ room.business.available_fund }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getPublicChatRoom } from "~/api/chat";
import type { ChatRoom } from "~/types/chatRoom";

definePageMeta({
  layout: "room",
  title: "home",
  keepalive: true,
});

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
