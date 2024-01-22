<template>
  <div v-if="hasJoined && !loading" class="relative flex h-full flex-col">
    <ChatTradeControl :total="500000" order-number="BS0000001" />
    <div
      ref="chatListDiv"
      class="my-[0.18rem] flex h-full flex-col gap-[1rem] overflow-auto px-[0.5rem] py-[0.2rem]"
      @scroll="onScroll"
    >
      <div v-show="fetchingMoreChat" class="flex justify-center">
        {{ $t("loading") }}
      </div>
      <UiChatBubble
        v-for="(c, i) in chats"
        :key="i"
        :name="!c.user_id ? c.admin?.name ?? '' : c.user?.name ?? ''"
        :text="c.message"
        :timestamp="c.created_at"
        :show-profile="true"
        :type="
          c.type === 'action'
            ? 'action'
            : c.user_id === authStore.user?.id
            ? 'outgoing'
            : 'incoming'
        "
      />
      <div ref="bottomEl" />
    </div>
    <ChatInput
      v-if="hasJoined"
      v-model="messagePayload.message"
      @submit="onSubmit"
    />
  </div>
  <div
    v-else-if="!hasJoined && !loading"
    class="relative flex h-full flex-col px-5 pb-4"
  >
    <div class="flex h-full flex-col items-center justify-end">
      <button
        class="w-full rounded-full bg-[#50a7ea] p-[0.7rem] text-white shadow-xl"
        @click="onJoinChat"
      >
        Join Chat
      </button>
    </div>
  </div>
  <div v-else-if="loading" class="flex h-screen items-center justify-center">
    <div
      class="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"
    />
  </div>
</template>

<script setup lang="ts">
import { API_CHAT } from "~/api/apiChat";
import { Chat, ChatDetail } from "~/types/chat";
import { API_CHAT_ROOM } from "~/api/apiChatRoom";
import { useAuthStore } from "~/stores/auth";
import usePageStore from "~/stores/page";

const { $evOn, $evOff } = useNuxtApp();
const route = useRoute();
const pageStore = usePageStore();
const authStore = useAuthStore();

const roomID = +route.params.id;

const bottomEl = ref<HTMLDivElement | null>(null);
const loading = ref<boolean>(false);
const chats = ref<Chat[]>([]);
const hasJoined = ref<boolean>(false);
const lastItemId = ref<number>(0);
const hasMore = ref<boolean>(false);
const firstLoad = ref<boolean>(true);
const fetchingMoreChat = ref<boolean>(false);
const chatListDiv = ref<HTMLDivElement | null>(null);
const detail = ref<ChatDetail>();

const messagePayload = ref<{
  type: "text";
  message: string;
}>({
  type: "text",
  message: "",
});

onMounted(() => {
  fetchChats();

  $evOn("new_chat_received", (d: any) => {
    if (d.chat_room_id !== roomID) return;
    addChatAndSort(d);
  });
});

onUnmounted(() => {
  $evOff("new_chat_received");
});

useHead({
  title: detail.value?.business.title ?? "",
});

definePageMeta({
  layout: "chat",
});

async function onJoinChat() {
  await API_CHAT_ROOM.JOIN_PUBLIC_ROOM.execute(roomID);
  hasJoined.value = true;
  fetchChats();
}

async function fetchChats() {
  loading.value = true;
  const { data: chatDetail } = await API_CHAT.GET_CHAT_DETAIL.execute(roomID);
  hasJoined.value = chatDetail.value?.is_a_member ?? false;
  detail.value = chatDetail.value ?? undefined;
  pageStore.setTitle(chatDetail.value?.business.title ?? "");

  if (chatDetail.value?.is_a_member) {
    const { data } = await API_CHAT.GET_CHAT_MSG.execute(roomID, {
      last: lastItemId.value,
      limit: 15,
    });

    if (data.value?.results?.length) {
      chats.value = data.value.results.reverse();
      if (data.value.meta.has_next) {
        lastItemId.value = data.value.results[0].id;
        hasMore.value = data.value.meta.has_next;
      }
    }

    sleepScrollToBottom();
  }
  loading.value = false;
}

async function sleepScrollToBottom() {
  await sleep(20);
  scrollToBottom();
}

function scrollToBottom() {
  if (bottomEl.value) {
    if (firstLoad.value) {
      bottomEl.value.scrollIntoView();
      firstLoad.value = false;
    } else {
      bottomEl.value.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function addChatAndSort(newChat: Chat) {
  chats.value = [newChat, ...chats.value];
  chats.value = chats.value.sort((a, b) => {
    return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
  });

  sleepScrollToBottom();
}

async function fetchMoreChats() {
  if (!hasMore.value) return;
  fetchingMoreChat.value = true;
  const { data } = await API_CHAT.GET_CHAT_MSG.execute(roomID, {
    last: lastItemId.value,
    limit: 15,
  });
  if (data.value?.results?.length) {
    chats.value = [...data.value.results.reverse(), ...chats.value];

    if (data.value.meta.has_next) {
      lastItemId.value = data.value.results[0].id;
      hasMore.value = true;
    } else {
      hasMore.value = false;
    }
  }
  fetchingMoreChat.value = false;
}

async function onScroll(e: Event) {
  if (!chatListDiv.value) return;

  const target = e.target as HTMLDivElement;
  const list = chatListDiv.value;

  if (target.scrollTop === 0 && target.scrollHeight !== target.clientHeight) {
    const oldHeight = list.scrollHeight;
    await fetchMoreChats();
    nextTick(() => {
      target.scrollTop = list.scrollHeight - oldHeight;
    });
  }
}

async function onSubmit() {
  if (messagePayload.value.message.trim() === "") return;

  await API_CHAT.ADD_TEXT_CHAT.execute(
    roomID,
    messagePayload.value.message.trim()
  );

  messagePayload.value.message = "";
  sleepScrollToBottom();
}
</script>
