<template>
  <div v-if="isLoading" class="flex flex-1 items-center justify-center">
    <UiCircularLoading />
  </div>

  <div v-else class="flex flex-col">
    <div class="flex flex-col gap-[24px] bg-white px-[12px] py-[15px]">
      <UiSwitch
        v-show="store.user?.type === 'merchant'"
        v-model="selectedTab"
        :options="REPORT_TAB_OPTION"
        style="height: 35px"
        class="bg-white"
        :button-height="'30px'"
      />
      <div class="flex flex-row items-center justify-between">
        <UiCheckbox
          v-model:model-value="selectedCheckboxIndex"
          class="w-full"
          :options="REPORT_CHECKBOX_OPTION"
          @click="onSelectCheckBox"
        />
        <div class="ml-[30px] flex flex-row items-center">
          <VanPopup
            :key="isShowDatePicker.toString()"
            v-model:show="isShowDatePicker"
            position="bottom"
            round
            @closed="() => (isShowDatePicker = false)"
          >
            <ReportDateSelection
              :start-date="startDate"
              :end-date="endDate"
              @cancel="() => (isShowDatePicker = false)"
              @confirmed="onFilterDate"
            />
          </VanPopup>
          <UiDivider type="vertical" color="#818086" height="25px" />
          <Calender class="ml-[10px]" @click="onOpenDatePicker" />
        </div>
      </div>
    </div>

    <ReportTransaction
      v-if="report"
      :key="report.keys.length"
      :selected-check-box-index="selectedCheckboxIndex"
      class="mb-[10px]"
      :report="report"
    />
    <div class="mt-[20px] flex flex-col gap-[24px] bg-white py-[15px]">
      <h3 class="px-[12px] text-[16px] text-[#818086]">总交易成功次数</h3>
      <UiDivider type="horizontal" />
      <div class="flex flex-row px-[12px]">
        <p class="w-1/4 text-[14px]">日期</p>
        <p class="w-1/4 text-start text-[14px]">交易人数</p>
        <p class="flex-1 text-end text-[14px]">交易总量</p>
      </div>
      <div
        v-for="(item, key, index) in report?.data"
        :key="key"
        class="flex flex-col gap-[10px] px-[12px]"
      >
        <div class="flex flex-row">
          <p class="w-1/4 text-[14px]">
            {{ report?.keys[index] }}
          </p>
          <p class="w-1/4 text-start text-[14px]">
            {{ item.total_payment }}
          </p>
          <p class="flex-1 text-end text-[14px]">
            {{ item.total_amount.toVFixed(2) }}
          </p>
        </div>
        <UiDivider type="horizontal" color="#000" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { getReportTransaction } from "~/api/report";
import {
  REPORT_TAB_OPTION,
  REPORT_CHECKBOX_OPTION,
} from "~/constants/options/report";
import type { Option } from "~/types/common";
import type { ReportTransaction } from "~/types/report";

const store = useAuthStore();

definePageMeta({
  layout: "report",
});

const isLoading = ref(false);
const isShowDatePicker = ref(false);

const startDate = ref(new Date());
const endDate = ref(new Date());

const selectedTab = ref<Option>(REPORT_TAB_OPTION[0]);
const selectedCheckboxIndex = ref<number>(0);
const report = ref<ReportTransaction>();

onMounted(() => {
  getReport();
  if (store.selectedReportTab) {
    selectedTab.value = store.selectedReportTab;
  } else if (store.user?.type === "merchant") {
    selectedTab.value = REPORT_TAB_OPTION[1];
  } else {
    selectedTab.value = REPORT_TAB_OPTION[0];
  }
});

watch(
  () => selectedTab.value,
  () => {
    store.selectedReportTab = selectedTab.value;
  }
);

function onOpenDatePicker() {
  isShowDatePicker.value = !isShowDatePicker.value;
}

async function getReport(stateDateParam?: Date, endDateParam?: Date) {
  if (!report.value) {
    isLoading.value = true;
  }

  try {
    const { startDate, endDate } = calculateDateRange(
      selectedCheckboxIndex.value,
      stateDateParam,
      endDateParam
    );
    const response = await getReportTransaction({
      start_date: startDate,
      end_date: endDate,
    });
    report.value = response;
  } catch (error: any) {
    showFailToast(error);
  } finally {
    isLoading.value = false;
  }
}

function onFilterDate(startDate: Date, endDate: Date) {
  isLoading.value = true;
  selectedCheckboxIndex.value = -1;
  getReport(startDate, endDate);
  isShowDatePicker.value = false;
}

function onSelectCheckBox(index: number) {
  if (index === selectedCheckboxIndex.value) return;

  selectedCheckboxIndex.value = index;
  getReport();
}

function calculateDateRange(
  index: number,
  startDateParam?: Date,
  endDateParam?: Date
): {
  startDate: string;
  endDate: string;
} {
  const tempStartDate = startDateParam ?? new Date();
  const tempEndDate = endDateParam ?? new Date();

  switch (index) {
    case 0: // Today
      break;
    case 1: // This week
      tempStartDate.setDate(
        tempStartDate.getDate() - tempStartDate.getDay() + 1
      );
      tempEndDate.setDate(tempStartDate.getDate() + 6);
      break;
    case 2: // This month
      tempStartDate.setDate(1);
      tempEndDate.setMonth(tempStartDate.getMonth() + 1, 0);
      break;
    case 3: // This year
      tempStartDate.setMonth(0, 1);
      tempEndDate.setMonth(11, 31);
      break;
    default:
      break;
  }

  startDate.value = tempStartDate;
  endDate.value = tempEndDate;

  return {
    startDate: formatDate(tempStartDate),
    endDate: formatDate(tempEndDate, true),
  };
}

function formatDate(date: Date, isEndDate: boolean = false): string {
  return (
    date.toISOString().split("T")[0] + (isEndDate ? "T23:59:59" : "T00:00:00")
  );
}
</script>
