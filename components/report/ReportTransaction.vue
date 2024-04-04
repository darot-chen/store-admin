<template>
  <div class="flex flex-col gap-[24px] bg-white px-[20px] py-[20px]">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <p class="font-400 text-base text-[#818086]">
          {{ $t("total_transaction_volume", { period: periodText }) }}
        </p>
        <h2 class="font-500 text-2xl">
          {{ Number(report.summary.total_amount).toFixed(2) }} U
        </h2>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-[5px]">
          <div
            class="place-self-center rounded-sm"
            style="
              background-color: #5abf5f;
              height: 12px;
              width: 12px;
              display: flex;
            "
          />
          <span style="color: #5abf5f" class="text-xs">{{
            $t("past_total")
          }}</span>
        </div>
        <div class="flex flex-row gap-[5px]">
          <div
            class="place-self-center rounded-sm"
            style="
              background-color: #c75a5a;
              height: 12px;
              width: 12px;
              display: flex;
            "
          />
          <span style="color: #c75a5a" class="text-xs">{{
            $t("current_total")
          }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <div class="text-left">
        <Line :data="data" :options="options" />
      </div>
      <div class="mt-[20px] flex flex-row items-center justify-around">
        <div class="flex flex-col items-center">
          <p class="font-500 text-sm text-[#818086]">
            {{ $t("total_transaction_amount") }}
          </p>
          <h3 class="font-500 text-xl text-black">
            {{ report.summary.total_amount }}
          </h3>
        </div>
        <div class="h-[20px] w-[1px] dark:bg-[#CCC]" />
        <div class="flex flex-col items-center">
          <p class="font-500 text-sm text-[#818086]">
            {{ $t("in_transaction") }}
          </p>
          <h3 class="font-500 text-xl text-black">
            {{ report.summary.total_payment }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "vue-chartjs";
import type { ReportTransaction } from "~/types/report";

const props = defineProps<{
  report: ReportTransaction;
  selectedCheckBoxIndex: number;
  startDate: Date;
  endDate: Date;
}>();

const periodText = computed(() => {
  switch (props.selectedCheckBoxIndex) {
    case 0:
      return "全部的";
    case 1:
      return "本星期";
    case 2:
      return "这个月";
    case 3:
      return "今年";
    default:
      return "这一时期";
  }
});

const dataLabel = () => {
  const currentDate = new Date();
  const differenceInDays = Math.abs(
    (props.endDate.getTime() - props.startDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  switch (props.selectedCheckBoxIndex) {
    case 0:
      return ["晨", "午", "晚"];
    case 1:
      return [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ];
    case 2: {
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const labels = [];
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(`${currentDate.getMonth() + 1}月${i}日`);
      }

      return labels;
    }

    case 3: {
      const labelsYear = [];
      for (let i = 0; i < 12; i++) {
        labelsYear.push(`${i + 1}月`);
      }
      return labelsYear;
    }
    case -1: {
      if (differenceInDays <= 1) {
        return ["晨", "午", "晚"];
      }

      const startMonth = props.startDate.getFullYear();
      const endMonth = props.endDate.getFullYear();

      const isTheSameYear = startMonth === endMonth;

      const labels = [];
      const tempCurrentDate = new Date(props.startDate);
      while (tempCurrentDate <= props.endDate) {
        const formattedDate =
          `${tempCurrentDate.getMonth() + 1}月${tempCurrentDate.getDate()}日` +
          (isTheSameYear ? "" : `${tempCurrentDate.getFullYear()}年`);

        labels.push(formattedDate);
        tempCurrentDate.setDate(tempCurrentDate.getDate() + 1);
      }
      return labels;
    }

    default:
      break;
  }
};

const totalAmounts = () => {
  if (props.selectedCheckBoxIndex === 3) {
    const monthlyTotalAmount: number[] = new Array(12).fill(0);
    for (const key in props.report.data) {
      const date = new Date(key);
      const month = date.getMonth();
      monthlyTotalAmount[month] += props.report.data[key].total_amount;
    }

    return monthlyTotalAmount;
  }

  return Object.values(props.report.data).map(
    (summary) => summary.total_amount
  );
};

const data = ref<ChartData<"line">>({
  labels: dataLabel(),
  datasets: [
    {
      data: totalAmounts(),
    },
  ],
});

const options = ref<ChartOptions<"line">>({
  responsive: true,
  showLine: true,
  color: "#DDD",

  backgroundColor: "#000",

  line: {
    datasets: {
      backgroundColor: "#000",
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
});
</script>
