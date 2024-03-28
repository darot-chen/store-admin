<template>
  <div class="relative flex h-full flex-col overflow-auto" @scroll="onScroll">
    <div class="sticky top-0 w-full bg-white px-3 py-3">
      <input
        ref="inputRef"
        v-model="searchQuery"
        type="text"
        class="relative z-20 w-full rounded-lg bg-[#7676801F] p-2.5 pl-10 placeholder:text-center"
        @input="handleInput"
      />

      <Icon
        name="Edit"
        color="#037EE5"
        class="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-2"
      />
      <div
        v-if="!searchQuery"
        class="absolute left-[60px] top-1/2 flex -translate-y-1/2 items-center gap-2"
      >
        <span class="whitespace-nowrap text-[#3C3C4399]">
          {{ $t("chat_search_place_holder") }}
        </span>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="absolute top-1/2 flex justify-center place-self-center"
    >
      <UiCircularLoading size="24" />
    </div>
    <div v-else>
      <div v-if="searchItems.length === 0 && chatRoomSearchItems.length === 0">
        <div class="flex h-full items-center justify-center">
          <VanEmpty image="search" />
        </div>
      </div>
      <div v-else>
        <div v-if="chatRoomSearchItems.length > 0">
          <VanDivider style="margin: 4px">{{ $t("chat_room") }}</VanDivider>
          <SearchItem
            v-for="room in chatRoomSearchItems"
            :key="room.id"
            :room="room"
            type="room"
          />
        </div>
        <div v-if="searchItems.length > 0">
          <VanDivider style="margin: 4px">{{ $t("message") }}</VanDivider>
          <SearchItem
            v-for="message in searchItems"
            :key="message.chat_room.id"
            :message="message"
            type="message"
          />
        </div>
      </div>
      <div v-show="loadMore" class="mt-1 flex justify-center">
        <UiCircularLoading size="24" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getChatMessages, getPublicChatRoom } from "~/api/chat";
import type { ChatMessage } from "~/types/chat";
import type { ChatRoom } from "~/types/chatRoom";

const pageStore = usePageStore();
const { t } = useI18n();

onMounted(() => {
  pageStore.setTitle(t("search"));

  nextTick(() => {
    inputRef.value?.focus();
  });
});

const searchQuery = ref("");

const loadMore = ref(false);
const isLoading = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const searchItems = ref<ChatMessage[]>([]);
const chatRoomSearchItems = ref<ChatRoom[]>([]);
const cursorId = ref(0);
const cursorRoomId = ref(0);

onMounted(() => {
  fetchChatMessages();
});

const handleInput = () => {
  searchItems.value = [];
  chatRoomSearchItems.value = [];
  cursorId.value = 0;
  cursorRoomId.value = 0;
  loadMoreResults();
  isLoading.value = true;
};

const fetchChatMessages = async () => {
  const res = await Promise.all([
    getPublicChatRoom("private", {
      last: cursorRoomId.value,
      keyword: searchQuery.value,
      limit: 20,
    }),
    getChatMessages({
      last: cursorId.value,
      query: searchQuery.value,
      limit: 20,
    }),
  ]);

  searchItems.value = res[1].results;
  chatRoomSearchItems.value = res[0].results;
  cursorId.value = res[0].results[res[0].results.length - 1]?.id || 0;
  cursorRoomId.value = res[1].results[res[1].results.length - 1]?.id || 0;
  loadMore.value = res[1].meta.has_next;
  isLoading.value = false;
};

const onScroll = (event: Event) => {
  const target = event.target as HTMLDivElement;
  const { scrollTop, clientHeight, scrollHeight } = target;

  if (scrollTop + clientHeight >= scrollHeight) {
    loadMoreResults();
  }
};

const loadMoreResults = useDebounceFn(() => {
  fetchChatMessages();
}, 300);
</script>
