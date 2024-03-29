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
          :text="option.title"
          @click="() => onItemClicked(option.id)"
        />
      </VanGrid>
      <template #reference>
        <div class="flex flex-row items-center" @click="() => {}">
          <VanIcon name="filter-o" color="#50a7ea" size="16px" />
          <p class="text-[14px] text-[#50a7ea]">Filter</p>
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

const emit = defineEmits<{
  onClicked: [id: number];
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
  emit("onClicked", id);
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
