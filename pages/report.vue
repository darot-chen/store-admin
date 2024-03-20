<template>
  <div class="flex flex-col">
    <div class="flex flex-col gap-[24px] bg-white px-[12px] py-[15px]">
      <UiSwitch
        v-model="selectedTab"
        :options="REPORT_TAB_OPTION"
        style="height: 35px"
        class="bg-white"
        :button-height="'30px'"
      />
      <UiCheckbox
        v-model:model-value="selectedCheckboxIndex"
        :options="REPORT_CHECKBOX_OPTION"
        @update:model-value="handleSelectedCheckbox"
      />
    </div>

    <ReportTransaction class="mt-[20px]" />
    <div class="mt-[20px] flex flex-col gap-[24px] bg-white py-[15px]">
      <h3 class="px-[12px] text-[16px] text-[#818086]">总交易成功次数</h3>
      <UiDivider class="mb-[5px] h-0 w-full border-t border-[#CCC]" />
      <div class="flex flex-row px-[12px]">
        <p class="w-1/4 text-[14px]">日期</p>
        <p class="w-1/4 text-start text-[14px]">交易人数</p>
        <p class="flex-1 text-end text-[14px]">交易总量</p>
      </div>
      <div
        v-for="(item, index) in Array(10)"
        :key="index"
        class="flex flex-col gap-[10px] px-[12px]"
      >
        <div class="flex flex-row">
          <p class="w-1/4 text-[14px]">2024/02/14</p>
          <p class="w-1/4 text-start text-[14px]">533</p>
          <p class="flex-1 text-end text-[14px]">9898989.3332</p>
        </div>
        <UiDivider type="horizontal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  REPORT_TAB_OPTION,
  REPORT_CHECKBOX_OPTION,
} from "~/constants/options/report";
import type { Option } from "~/types/common";

definePageMeta({
  layout: "report",
});

const selectedTab = ref<Option>(REPORT_TAB_OPTION[0]);
const selectedCheckboxIndex = ref<number>(0);

const handleSelectedCheckbox = (index: number) => {
  if (index === selectedCheckboxIndex.value) {
    return;
  }

  selectedCheckboxIndex.value = index;
};
</script>
