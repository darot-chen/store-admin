<template>
  <div>
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

    <ReportTransaction />
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
