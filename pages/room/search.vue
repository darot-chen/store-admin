<template>
  <div
    class="relative flex h-full flex-col overflow-auto"
    @scroll="handleScroll"
  >
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
      <div v-if="searchItems.length === 0">
        <div class="flex h-full items-center justify-center">No data</div>
      </div>
      <div
        v-for="room in searchItems"
        v-else
        :key="room.chat_room.id"
        class="border-b border-gray-300"
      >
        <div class="rounded-md bg-white">
          <NuxtLink
            class="flex max-h-[75px] cursor-pointer flex-col justify-between rounded-md border-b p-2"
            :to="`/room/chat/${room.chat_room.id}?msgId=${room.id}`"
          >
            <div class="flex gap-2">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full"
                :style="{
                  background: generateLinearGradient(
                    room.chat_room.business.title,
                    room.chat_room.id
                  ),
                }"
              >
                <span class="text-lg font-bold text-[#fff]">
                  {{
                    room.chat_room.business.title?.charAt(0).toUpperCase() || ""
                  }}
                </span>
              </div>

              <div class="flex w-7/12 flex-col">
                <div>
                  <h1 class="font-medium">
                    {{ room.chat_room.business.title }}
                    <span v-if="room.chat_room.lobby_no">
                      {{ $t("lobby_no") }} {{ room.chat_room.lobby_no }}
                    </span>
                  </h1>
                  <ChatEvent
                    v-if="room.type === ChatType.Action"
                    class="line-clamp-3 text-sm text-[#8E8E93]"
                    :text="room.message"
                    :name="room.message"
                  />
                  <p
                    v-else
                    class="line-clamp-2 text-ellipsis text-sm text-[#8E8E93]"
                  >
                    {{ room.message || "" }}
                  </p>
                </div>
              </div>

              <div class="ml-auto flex flex-col items-end justify-between">
                <div class="flex gap-1.5">
                  <span class="text-sm text-[#8E8E93]">
                    {{ formatChatListDate(room?.created_at.toString()) }}
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div v-show="loadMore" class="mt-1 flex justify-center">
        <UiCircularLoading size="24" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getChatMessages } from "~/api/chat";
import { ChatType, type ChatMessage } from "~/types/chat";

const pageStore = usePageStore();

onMounted(() => {
  pageStore.setTitle("Search");

  nextTick(() => {
    inputRef.value?.focus();
  });
});

const searchQuery = ref("");

const loadMore = ref(false);
const isLoading = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const searchItems = ref<ChatMessage[]>([]);
const cursorId = ref(0);

onMounted(() => {
  fetchChatMessages();
});

const handleInput = () => {
  searchItems.value.length = 0;
  cursorId.value = 0;
  loadMoreResults();
  isLoading.value = true;
};

const fetchChatMessages = async () => {
  if (searchItems.value.length === 0) {
    isLoading.value = true;
  }

  const res = await getChatMessages({
    last: cursorId.value,
    query: searchQuery.value,
    limit: 20,
  });

  searchItems.value.push(...res.results);
  cursorId.value = res.results[res.results.length - 1]?.id || 0;
  loadMore.value = res.meta.has_next;
  isLoading.value = false;
};

const handleScroll = (event: Event) => {
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
