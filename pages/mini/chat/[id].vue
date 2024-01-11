<template>
  <div
    style="display: block; overflow: auto; height: calc(100vh - 130px)"
    @scroll="onScroll"
  >
    <!-- <div class="absolute bottom-0 top-0 z-0">
      <img
        class="opacity-5"
        src="/img/chat-bg.jpeg"
        alt=""
        style="height: calc(100vh - 130px)"
      />
    </div> -->
    <div
      class="pointer-events-none fixed left-0 right-0 top-0 z-0 mx-auto max-w-lg"
      style="height: calc(100vh - 130px)"
    >
      <img
        class="h-full w-full object-cover opacity-5"
        src="/img/chat-bg.jpeg"
        alt="chat-bg"
        style="object-position: center; object-fit: cover"
      />
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
    <div v-else>
      <div v-if="hasJoined" ref="chatListDiv" class="flex flex-col">
        <div v-show="fetchingMoreChat" class="flex justify-center">
          {{ t("loading") }}
        </div>
        <ChatMessage
          v-for="chat in chats"
          :key="chat.id"
          :is-sender="chat.user_id === userStore.userInfo.id"
          :content="chat.message"
          :type="chat.type"
          :user="chat.user"
          :admin="chat.admin"
          :created-at="chat.created_at"
        />
        <ChatInput
          :message="messagePayload.message"
          @input="onTyping"
          @submit="onSubmitChat"
          @attach-file="onAttachFile"
        />
        <div ref="bottomEl" />
      </div>
      <div
        v-else
        class="fixed bottom-2 left-0 right-0 mx-auto max-w-lg cursor-pointer rounded-full border-[1px] border-[#D7DBEE] bg-[#FE863F] p-3 text-center text-white"
        @click="onJoinChat"
      >
        {{ t("join_chat") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "~/stores/userStore";
import { API_CHAT } from "~/api/apiChat";
import { API_CHAT_ROOM } from "~/api/apiChatRoom";
import { Chat } from "~/types/chat";
import { showToast } from "vant";

definePageMeta({
  layout: "chat",
  title: "home",
  keepalive: true,
});
const route = useRoute();
const userStore = useUserStore();
const { $evOn, $evOff } = useNuxtApp();
const { t } = useI18n();

const chats = ref<Chat[]>([]);
const bottomEl = ref<HTMLDivElement | null>(null);
const chatListDiv = ref<HTMLDivElement | null>(null);
const firstLoad = ref<boolean>(true);
const fetchingMoreChat = ref<boolean>(false);
const loading = ref<boolean>(false);

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
const hasJoined = ref<boolean>(false);

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

async function onAttachFile(file: File) {
  if (!file || !roomID) return;

  sleepScrollToBottom();

  if (file.type === "video/mp4") {
    if (file.size > 10 * 1024 * 1024) {
      showToast({
        message: t(`attach_file_must_be`, {
          value: "10",
        }),
        position: "top",
      });
    }
    const { error } = await API_CHAT.ADD_VIDEO_CHAT.execute(roomID, file);
    if (error.value) {
      showToast({
        message: error.value?.data.message,
        position: "top",
      });
    }
  } else {
    if (file.size > 2 * 1024 * 1024) {
      showToast({
        message: t(`attach_file_must_be`, {
          value: "2",
        }),
        position: "top",
      });
    }

    const { error } = await API_CHAT.ADD_IMAGE_CHAT.execute(roomID, file);
    if (error.value) {
      showToast({
        message: error.value?.data.message,
        position: "top",
      });
    }
  }
}

const onJoinChat = async () => {
  const { error } = await API_CHAT_ROOM.JOIN_PUBLIC_ROOM.execute(roomID);
  if (!error.value) {
    hasJoined.value = true;
    return;
  }

  showToast({
    message: error.value?.data.message,
    position: "top",
  });
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
      lastItemId.value = data.value.results[0].id;
      hasMore.value = true;
    } else {
      hasMore.value = false;
    }
  }
  fetchingMoreChat.value = false;
};

const fetchChats = async () => {
  loading.value = true;
  const { data, error } = await API_CHAT.GET_CHAT_MSG.execute(roomID, {
    last: lastItemId.value,
    limit: 15,
  });

  error.value?.data.message === "Forbidden"
    ? (hasJoined.value = false)
    : (hasJoined.value = true);

  if (data.value?.results?.length) {
    chats.value = data.value.results.reverse();
    if (data.value.meta.has_next) {
      lastItemId.value = data.value.results[0].id;
      hasMore.value = data.value.meta.has_next;
    }
  }

  loading.value = false;
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

<style scoped>
.background-image {
  background-image: url("/img/chat-bg.jpeg");
  background-repeat: no-repeat;
}
</style>
