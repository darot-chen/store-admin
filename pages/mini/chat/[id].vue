<template>
  <div
    style="display: block; overflow: auto; height: calc(100vh - 130px)"
    @scroll="onScroll"
  >
    <div ref="chatListDiv" class="flex flex-col">
      <div v-if="hasMore" class="flex justify-center">Loading</div>
      <ChatMessage
        v-for="chat in chats"
        :key="chat.id"
        :is-sender="chat.user_id === userStore.userInfo.id"
        :content="chat.message"
        :type="chat.type"
      />
      <ChatInput
        :message="messagePayload.message"
        @input="onTyping"
        @submit="onSubmitChat"
      />
    </div>
    <div ref="bottomEl" />
  </div>
</template>

<script setup lang="ts">
import useUserStore from "~/stores/userStore";
import { API_CHAT } from "~/api/apiChat";
import { Chat } from "~/types/chat";

definePageMeta({
  layout: "chat",
  title: "home",
  keepalive: true,
});
const route = useRoute();
const userStore = useUserStore();
const { $evOn, $evOff } = useNuxtApp();

const chats = ref<Chat[]>([]);
const bottomEl = ref<HTMLDivElement | null>(null);
const chatListDiv = ref<HTMLDivElement | null>(null);
const first = ref<boolean>(true);
const fetchingMoreChat = ref<boolean>(false);

const messagePayload = ref<{
  type: "text";
  message: string;
}>({
  type: "text",
  message: "",
});

const lastItemId = ref<number>(0);
const roomID = +route.params.id;
const hasMore = ref<boolean>(false);

function scrollToBottom() {
  if (bottomEl.value) {
    if (first.value) {
      bottomEl.value.scrollIntoView();
      first.value = false;
    } else {
      bottomEl.value.scrollIntoView({ behavior: "smooth" });
    }
  }
}

const addChatAndSort = (newChat: Chat) => {
  chats.value = [newChat, ...chats.value];
  chats.value = chats.value.sort((a, b) => {
    return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
  });

  sleepScrollToBottom();
};

const onTyping = (value: string) => {
  messagePayload.value.message = value;
};

const onSubmitChat = async () => {
  if (messagePayload.value.message.trim() === "") return;

  await API_CHAT.ADD_TEXT_CHAT.execute(
    roomID,
    messagePayload.value.message.trim()
  );

  messagePayload.value.message = "";
  sleepScrollToBottom();
};

const fetchMoreChats = async () => {
  if (!hasMore.value) return;
  fetchingMoreChat.value = true;
  const { data } = await API_CHAT.GET_CHAT_MSG.execute(roomID, {
    last: lastItemId.value,
    limit: 15,
  });
  if (data.value?.results?.length) {
    data.value.results.reverse();
    chats.value = [...data.value.results, ...chats.value];

    if (data.value.meta.has_next) {
      lastItemId.value = data.value.results[0].id; // Update last item fetched
      hasMore.value = true;
    } else {
      hasMore.value = false;
    }
  }
  fetchingMoreChat.value = false;
};

const fetchChats = async () => {
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
};

async function sleepScrollToBottom() {
  await sleep(20);
  scrollToBottom();
}

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;
  const list = chatListDiv.value;
  setTimeout(() => {
    if (scrollTop === 0 && scrollHeight !== clientHeight) {
      const oldHeight = list!.scrollHeight;
      fetchMoreChats();
      nextTick(() => {
        target.scrollTop = list!.scrollHeight - oldHeight;
      });
    }
  }, 300);
};

onMounted(() => {
  fetchChats();

  $evOn("new_chat_received", (d: any) => {
    if (d.chat_room_id !== +route.params.id) return;
    addChatAndSort(d);
  });
});

onUnmounted(() => {
  $evOff("new_chat_received");
});
</script>
