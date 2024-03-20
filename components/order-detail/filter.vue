<template>
  <div>
    <div class="flex flex-wrap justify-between gap-y-2 p-3">
      <div
        class="din-alternate-text flex items-center rounded-lg bg-white px-3 py-1 text-[#50A7EA]"
      >
        <p class="text-[12px]">2017年09月17日 ~ 2019年12月18日</p>
        <p class="mx-2 text-[12px]">|</p>
        <button @click="() => (showBottom = !showBottom)">
          <Icon name="tdesign:calendar" color="#45a9ec" />
        </button>
      </div>
      <div
        class="flex cursor-pointer items-center rounded-lg border border-[#50A7EA] px-3 py-1 text-[#50A7EA] duration-300 hover:bg-white"
      >
        <p class="text-[12px]">担保订单</p>
        <p class="mx-2 text-[12px]">|</p>
        <Icon name="ant-design:filter-outlined" color="#45a9ec" />
      </div>
    </div>
    <VanPopup v-model:show="showBottom" class="rounded-t-xl" position="bottom">
      <div class="flex justify-between bg-[#F6F6F6] px-7 py-4">
        <button
          class="text-[17px] text-[#007AFF]"
          @click="() => (showBottom = !showBottom)"
        >
          关闭
        </button>
        <p class="text-[17px] font-bold">选择日期（多选）</p>
        <button class="text-[17px] font-bold text-[#007AFF]">确认</button>
      </div>
      <!-- Tabs -->
      <div class="relative mb-2 flex justify-between pb-2 pt-4">
        <div
          class="w-1/2 text-center"
          :class="selectingStartDate ? 'text-[#007AFF]' : 'text-black'"
          @click="() => (selectingStartDate = true)"
        >
          <p class="text-[17px]">开始日期</p>
          <p class="text-[14px]">
            {{ `${startDateStr[0]}年${startDateStr[1]}月${startDateStr[2]}日` }}
          </p>
        </div>
        <div
          class="w-1/2 text-center"
          :class="!selectingStartDate ? 'text-[#007AFF]' : 'text-black'"
          @click="() => (selectingStartDate = false)"
        >
          <p class="text-[17px]">开始日期</p>
          <p class="text-[14px]">
            {{ `${endDateStr[0]}年${endDateStr[1]}月${endDateStr[2]}日` }}
          </p>
        </div>
        <div
          class="absolute bottom-0 flex w-1/2 items-end justify-center transition-all duration-300"
          :class="[selectingStartDate ? 'left-[0%]' : 'left-[50%]']"
        >
          <div class="h-1 w-14 rounded-t-md bg-[#007AFF]"></div>
        </div>
      </div>

      <VanDatePicker
        v-if="selectingStartDate"
        v-model="startDateStr"
        :min-date="minDate"
        :max-date="maxDate"
        :option-height="50"
        :show-toolbar="false"
        :formatter="formatter"
        @cancel="() => (showBottom = !showBottom)"
      />
      <VanDatePicker
        v-else
        v-model="endDateStr"
        :min-date="minDate"
        :max-date="maxDate"
        :option-height="50"
        :show-toolbar="false"
        :formatter="formatter"
        @cancel="() => (showBottom = !showBottom)"
      />
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
import type { PickerOption } from "vant";

const showBottom = ref<boolean>(false);
const selectingStartDate = ref<boolean>(true);

const startDateStr = ref<string[]>(dateToListString(new Date()));
const endDateStr = ref<string[]>(dateToListString(new Date()));

const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 11, 31);

const formatter = (type: string, option: PickerOption) => {
  if (type === "year") {
    option.text += "";
  }
  if (type === "month") {
    option.text += "月";
  }
  if (type === "day") {
    option.text += "日";
  }

  return option;
};

function dateToListString(date: Date) {
  return date.toISOString().split("T")[0].split("-");
}
</script>

<style scoped>
:deep(.van-tab__text) {
  color: red;
  overflow: visible;
  height: 56px;
}
</style>
