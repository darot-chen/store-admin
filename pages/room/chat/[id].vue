<template>
  <div v-if="hasJoined && !loading" class="flex h-full flex-col">
    <div class="sticky top-0 z-10 w-full">
      <ChatTradeControl :total="500000" order-number="BS0000001" />
    </div>
    <div
      class="mx-1 flex flex-grow flex-col gap-[1rem] overflow-auto"
      @scroll="onScroll"
    >
      <div v-show="fetchingMoreChat" class="flex justify-center">
        {{ $t("loading") }}
      </div>
      <UiChatBubble
        v-for="c in chats"
        :key="c.id"
        :name="!c.user_id ? c.admin?.name ?? '' : c.user?.name ?? ''"
        :text="c.message"
        :timestamp="c.created_at"
        :show-profile="true"
        :type="c.type"
        :chat-type="c.user_id === authStore.user?.id ? 'outgoing' : 'incoming'"
      />
      <div ref="bottomEl" />
    </div>
    <div class="sticky bottom-0 w-full">
      <ChatInput
        v-if="hasJoined"
        v-model="messagePayload.message"
        :loading="isUploading"
        @submit="onSubmit"
        @attach-file="onAttachFile"
      />
    </div>
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
        {{ $t("join_chat") }}
      </button>
    </div>
  </div>
  <div v-else-if="loading" class="flex h-screen items-center justify-center">
    <div
      class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import usePageStore from "~/stores/page";
import {
  getChat,
  getChatDetail,
  joinPublicChatRoom,
  uploadImage,
  uploadVideo,
  addChat,
} from "~/api/chat";
import { type Chat, type ChatDetail } from "~/types/chat";
import { showFailToast } from "vant";

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
const chatDetail = ref<ChatDetail>();
const isUploading = ref<boolean>(false);
const { t } = useI18n();

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
  title: chatDetail.value?.business.title ?? "",
});

definePageMeta({
  layout: "chat",
});

async function onAttachFile(file: File) {
  isUploading.value = true;

  scrollToBottom();

  try {
    if (file.type === "video/mp4") {
      if (file.size > 20 * 1024 * 1024) {
        throw new Error(
          t("attach_file_must_be_smaller_than", {
            value: "10",
          })
        );
      }

      await uploadVideo(roomID, file);
    } else {
      if (file.size > 10 * 1024 * 1024) {
        throw new Error(
          t("attach_file_must_be_smaller_than", {
            value: "10",
          })
        );
      }

      await uploadImage(roomID, file);
    }
  } catch (e: any) {
    showFailToast(e?.message);
  } finally {
    isUploading.value = false;
  }
}

async function onJoinChat() {
  await joinPublicChatRoom(roomID);
  fetchChats();
}

async function fetchChats() {
  loading.value = true;
  const detail = await getChatDetail(roomID);

  hasJoined.value = detail.is_a_member ?? false;
  chatDetail.value = detail ?? undefined;
  pageStore.setTitle(detail?.business.title ?? "");

  if (chatDetail.value?.is_a_member) {
    const chatRes = await getChat(roomID, {
      last: lastItemId.value,
      limit: 15,
    });

    if (chatRes.results?.length) {
      chats.value = chatRes.results.reverse();

      if (chatRes.meta.has_next) {
        lastItemId.value = chatRes.results[0].id;
        hasMore.value = chatRes.meta.has_next;
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

async function onScroll(e: Event) {
  const target = e.target as HTMLDivElement;
  const scrollTop = target.scrollTop;
  const prevScrollHeight = target.scrollHeight ?? 0;
  const prevScrollTop = target.scrollTop ?? 0;

  if (scrollTop === 0) {
    await fetchMoreChats();

    if (target?.scrollHeight) {
      const currentScrollHeight = target.scrollHeight ?? 0;

      requestAnimationFrame(async () => {
        await nextTick(() => {
          target.scrollTop =
            currentScrollHeight - prevScrollHeight + prevScrollTop;

          target.style.overflow = "hidden";
          requestAnimationFrame(() => {
            target.style.overflow = "scroll";
          });
        });
      });
    }
  }

  async function fetchMoreChats() {
    if (!hasMore.value || firstLoad.value) return;
    fetchingMoreChat.value = true;

    const chatRes = await getChat(roomID, {
      last: lastItemId.value,
      limit: 15,
    });

    chats.value.unshift(...chatRes.results.reverse());

    if (chatRes.meta.has_next) {
      lastItemId.value = chatRes.results[0].id;
      hasMore.value = true;
    } else {
      hasMore.value = false;
    }
  }
  fetchingMoreChat.value = false;
}

async function onSubmit() {
  if (messagePayload.value.message.trim() === "") return;

  await addChat(roomID, messagePayload.value.message.trim());

  messagePayload.value.message = "";
  sleepScrollToBottom();
}
</script>
