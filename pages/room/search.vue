<template>
  <div class="m-5">
    <div class="relative">
      <input
        ref="inputRef"
        v-model="searchQuery"
        type="text"
        class="relative z-20 w-full rounded-lg bg-[#7676801F] p-2 pl-10 placeholder:text-center"
        @input="handleInput"
      />

      <Icon
        name="Edit"
        color="#037EE5"
        class="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2"
      />
      <div
        v-if="!searchQuery"
        class="absolute left-10 top-1/2 flex -translate-y-1/2 items-center gap-2"
      >
        <span class="whitespace-nowrap text-[#3C3C4399]">
          {{ $t("chat_search_place_holder") }}
        </span>
      </div>
    </div>

    <div class="mt-5 h-64 overflow-y-auto" @scroll="handleScroll">
      <div
        v-for="result in visibleResults"
        :key="result.id"
        class="border-b border-gray-300 py-2"
      >
        <div class="mb-1 h-3 w-16 rounded bg-gray-300"></div>
        <div class="h-3 w-48 rounded bg-gray-300"></div>
      </div>

      <div v-show="isLoading" class="flex justify-center">
        <UiCircularLoading size="24" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref } from "vue";

const pageStore = usePageStore();

onMounted(() => {
  pageStore.setTitle("Search");

  nextTick(() => {
    inputRef.value?.focus();
  });
});

const mockResults = [
  { id: 1, title: "Result 1" },
  { id: 2, title: "Result 2" },
  { id: 3, title: "Result 3" },
  { id: 4, title: "Result 4" },
  { id: 5, title: "Result 5" },
  { id: 6, title: "Result 6" },
  { id: 7, title: "Result 7" },
  { id: 8, title: "Result 8" },
  { id: 9, title: "Result 9" },
  { id: 10, title: "Result 10" },
];

const searchQuery = ref("");
const filteredResults = ref(mockResults);
const visibleResults = ref(filteredResults.value.slice(0, 5));
const loadMore = ref(true);
const isLoading = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const handleInput = () => {
  filteredResults.value = mockResults.filter((result) =>
    result.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  visibleResults.value = filteredResults.value.slice(0, 5);
  loadMore.value = true;
};

const handleScroll = (event: Event) => {
  const target = event.target as HTMLDivElement;
  const { scrollTop, clientHeight, scrollHeight } = target;

  if (
    scrollTop + clientHeight >= scrollHeight &&
    loadMore.value &&
    !isLoading.value
  ) {
    loadMoreResults();
  }
};

const loadMoreResults = _.debounce(() => {
  const nextIndex = visibleResults.value.length;
  const nextResults = filteredResults.value.slice(nextIndex, nextIndex + 5);
  visibleResults.value = [...visibleResults.value, ...nextResults];
  loadMore.value = nextResults.length === 5;
}, 300);
</script>
