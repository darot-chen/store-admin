<template>
  <div class="relative mr-3 flex flex-row justify-end">
    <VanPopover
      v-model:show="isPopoverVisible"
      placement="bottom-end"
      :overlay="true"
    >
      <VanGrid
        square
        clickable
        :border="true"
        column-num="3"
        style="width: 300px"
      >
        <div v-if="isLoading" class="flex items-center justify-center">
          <UiCircularLoading size="20px" />
        </div>
        <VanGridItem
          v-for="(option, _, index) in businessFilterOptions"
          :key="index"
          class="text-center"
          @click="() => onItemClicked(option.id)"
        >
          <icon
            v-if="option.id === selectedOptionId"
            name="lets-icons:check-fill"
            color="#50a7ea"
            size="16px"
          />
          <p class="text-[12px]">{{ option.title }}</p>
        </VanGridItem>
      </VanGrid>
      <div v-show="!isLoading" class="m-3 flex justify-center">
        <button
          class="rounded-sm bg-[#50a7ea] px-4 py-1 text-white"
          @click="onReset"
        >
          Reset
        </button>
      </div>

      <template #reference>
        <div class="relative flex flex-row items-center" @click="() => {}">
          <icon
            :name="hasFilter ? 'clarity:filter-solid' : 'clarity:filter-line'"
            color="#50a7ea"
            size="16px"
          />
          <p class="mr-2 text-[14px] text-[#50a7ea]">Filter</p>
          <div
            class="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"
          ></div>
        </div>
      </template>
    </VanPopover>
  </div>
</template>

<script setup lang="ts">
import { getBusinessFilter } from "~/api/chat";
import type { BusinessFilter } from "~/types/chat";

const isPopoverVisible = ref(false);
const businessFilterOptions = ref<BusinessFilter[]>();
const isLoading = ref(true);

const props = defineProps<{ hasFilter: boolean }>();
const selectedOptionId = ref<number>();

const emit = defineEmits<{
  onClicked: [id: number | undefined];
}>();

watch(isPopoverVisible, async (newVisible) => {
  if (newVisible) {
    fetchBusinessFilter();
    return;
  }

  if (businessFilterOptions.value) {
    await sleep(200);
    businessFilterOptions.value.length = 0;
    isLoading.value = false;
  }
});

const onItemClicked = (id: number) => {
  isPopoverVisible.value = false;
  selectedOptionId.value = id;
  emit("onClicked", id);
};

const onReset = () => {
  isPopoverVisible.value = false;
  if (props.hasFilter) emit("onClicked", undefined);
};

const fetchBusinessFilter = async () => {
  try {
    const result = await getBusinessFilter();

    businessFilterOptions.value = result;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
:root:root {
  --van-grid-item-content-active-color: red;
}
</style>
