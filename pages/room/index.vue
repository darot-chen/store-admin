<template>
  <div class="flex h-full flex-col gap-5 bg-[#FFFFFFBF]" @scroll="handleScroll">
    <ChatSearch class="px-3" />

    <UiCircularLoading
      v-if="loading"
      size="40"
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
    />
    <div v-else class="flex flex-col">
      <ChatListItem v-for="room in chatRooms" :key="room.id" :room="room" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPublicChatRoom } from "~/api/chat";
import { SOCKET_EVENT } from "~/constants/socket";
import type { ChatRoom } from "~/types/chatRoom";

const roomType = ref<string>("private");

const { $evOn, $evOff } = useNuxtApp();

const chatRooms = ref<ChatRoom[]>([]);
const lastItemId = ref<number>(0);
const loadMore = ref<boolean>(true);
const loading = ref<boolean>(false);
const firstLoad = ref<boolean>(false);

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

function handleScroll(event: Event) {
  const target = event.target as HTMLElement;
  const { scrollTop, clientHeight, scrollHeight } = target;

  setTimeout(() => {
    if (scrollTop + clientHeight >= scrollHeight) {
      if (loadMore.value) {
        fetchChatRooms();
      }
    }
  }, 300);
}

onMounted(() => {
  fetchChatRooms();
  $evOn(SOCKET_EVENT.NEW_CHAT_RECEIVED, async (d: any) => {
    const index = chatRooms.value.findIndex(
      (c) => c.id === d?.data?.chat_room?.id
    );
    if (index) {
      chatRooms.value[index].latest_message = d?.data;
      chatRooms.value[index].total_unread += 1;

      chatRooms.value.unshift(chatRooms.value.splice(index, 1)[0]);
      chatRooms.value[index].updated_at = new Date().toISOString();
    } else {
      await fetchChatRooms(true);
    }
  });
});

onBeforeUnmount(() => {
  $evOff(SOCKET_EVENT.NEW_CHAT_RECEIVED);
});
</script>
