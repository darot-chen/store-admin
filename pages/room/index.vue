<template>
  <div class="flex h-full flex-col gap-2 bg-[#FFFFFFBF]" @scroll="handleScroll">
    <ChatSearch class="px-3" />
    <ChatFilterChatRoom @click="onFilterItemClicked" />
    <UiCircularLoading
      v-if="loading"
      size="40"
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
    />
    <div v-else class="flex flex-1 flex-col">
      <p v-if="chatRooms.length === 0" class="flex justify-center">No room</p>
      <ChatListItem
        v-for="room in chatRooms"
        :key="room.id"
        :room="room"
        @delete="onDelete"
        @toggle-pin="onTogglePin"
      >
      </ChatListItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPublicChatRoom, leaveRoom, pinChat, unpinChat } from "~/api/chat";
import { SOCKET_EVENT } from "~/constants/socket";
import type { ChatRoom } from "~/types/chatRoom";

const roomType = ref<string>("private");

const { $evOn } = useNuxtApp();

const chatRooms = ref<ChatRoom[]>([]);
const lastItemId = ref<number>(0);
const loadMore = ref<boolean>(true);
const loading = ref<boolean>(false);
const firstLoad = ref<boolean>(true);
const businessId = ref<number>();

function onFilterItemClicked(id?: number) {
  firstLoad.value = true;
  businessId.value = id;
  fetchChatRooms(true);
}

async function onDelete(id: number) {
  const result = await leaveRoom(id);

  if (!result) {
    return;
  }

  chatRooms.value = chatRooms?.value.filter(
    (chat) => chat.id !== result.chat_room_id
  );
}

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
    business_id: businessId.value,
  });

  chatRooms.value = [
    ...chatRooms.value,
    ...res.results.sort((a, b) => {
      if (a.pin_at && b.pin_at) {
        return new Date(b.pin_at).getTime() - new Date(a.pin_at).getTime();
      }

      if (a.pin_at) {
        return -1;
      }

      if (b.pin_at) {
        return 1;
      }

      return (
        new Date(b.latest_message?.created_at).getTime() -
        new Date(a.latest_message?.created_at).getTime()
      );
    }),
  ];
  lastItemId.value = res.results[res.results.length - 1]?.id;
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

function onTogglePin(id: number) {
  const index = chatRooms.value.findIndex((room) => room.id === id);

  if (index >= 0) {
    if (chatRooms.value[index].pin_at) {
      chatRooms.value[index].pin_at = null;
      unpinChat(id);
      chatRooms.value.push(chatRooms.value.splice(index, 1)[0]);
    } else {
      chatRooms.value[index].pin_at = new Date().toISOString();
      pinChat(id);
      chatRooms.value.unshift(chatRooms.value.splice(index, 1)[0]);
    }
  }
}

onMounted(async () => {
  onMainButtonClick("About Us", () => {
    navigateTo("/");
  });

  await fetchChatRooms();

  $evOn(SOCKET_EVENT.NEW_CHAT_RECEIVED, async (d) => {
    const index = chatRooms.value.findIndex(
      (room) => room.id === d?.data.chat_room_id
    );

    if (index >= 0) {
      chatRooms.value[index].latest_message = d?.data;
      chatRooms.value[index].total_unread += 1;

      chatRooms.value.sort((a, b) => {
        if (a.pin_at && b.pin_at) {
          return new Date(b.pin_at).getTime() - new Date(a.pin_at).getTime();
        }

        if (a.pin_at) {
          return -1;
        }

        if (b.pin_at) {
          return 1;
        }

        return (
          new Date(b.latest_message?.created_at).getTime() -
          new Date(a.latest_message?.created_at).getTime()
        );
      });
    } else {
      await fetchChatRooms(true);
    }
  });
});
</script>

<style scoped>
:root:root {
  --van-button-primary-border-color: transparent;
  --van-button-primary-color: #ffffffbf;
}
</style>
