<template>
  <div>
    <div
      class="flex cursor-pointer items-center rounded-lg border border-[#50A7EA] px-3 py-1 text-[#50A7EA] duration-300 hover:bg-white"
      @click="() => (showBottom = true)"
    >
      <p class="text-[12px]">担保订单</p>
      <p class="mx-2 text-[12px]">|</p>
      <Icon name="ant-design:filter-outlined" color="#45a9ec" />
    </div>
    <VanPopup v-model:show="showBottom" position="bottom">
      <UiPopupNavBar
        title="选择日期（多选）"
        left-text="关闭"
        @left-text-click="() => (showBottom = false)"
        @right-text-click="() => (showBottom = false)"
      />
      <div class="px-4 py-4">
        <p>担保订单</p>
        <div class="mt-3 grid grid-cols-3 gap-3">
          <div
            v-for="(id, index) in listId"
            :key="id"
            class="relative cursor-pointer overflow-hidden rounded-md px-3 py-2 text-center"
            :class="[
              index === selectedIndex
                ? 'bg-[#E7F1FF] text-[#007AFF]'
                : 'bg-[#F5F5F5]',
            ]"
            @click="() => (selectedIndex = index)"
          >
            {{ id }}
            <div
              v-if="index === selectedIndex"
              class="absolute -bottom-1 -right-4 h-5 w-10 -rotate-45 bg-[#007AFF]"
            ></div>
            <div
              v-if="index === selectedIndex"
              class="absolute -bottom-0.5 right-0.5 flex h-4 w-3 justify-center"
            >
              <Icon
                name="material-symbols-light:check"
                size="12"
                color="white"
              />
            </div>
          </div>
        </div>
      </div>
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
const showBottom = ref<boolean>(false);
const selectedIndex = ref(0);

const listId: string[] = [
  "BS000001",
  "BS000001",
  "BS000001",
  "BS000001",
  "BS000001",
  "BS000001",
  "BS000001",
];
</script>

<style scoped></style>
