<template>
  <div class="flex flex-col gap-[24px] bg-white px-[20px] py-[20px]">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <p class="font-400 text-base text-[#818086]">
          {{ $t("total_transaction_volume_this_week") }}
        </p>
        <h2 class="font-500 text-2xl">15,320,500 U</h2>
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
      <UiDivider class="mb-[5px] h-0 w-full border-t border-[#CCC]" />
      <p class="font-500 place-self-center text-xs text-black">
        Jan,2 2024 at 6:00 in the morning
      </p>
      <div class="text-left">
        <Line :data="data" :options="options" />
      </div>
      <div class="flex flex-row items-center justify-around">
        <div class="flex flex-col items-center">
          <p class="font-500 text-sm text-[#818086]">
            {{ $t("total_transaction_amount") }}
          </p>
          <h3 class="font-500 text-xl text-black">1,260,000</h3>
        </div>
        <div class="h-[20px] w-[1px] dark:bg-[#CCC]" />
        <div class="flex flex-col items-center">
          <p class="font-500 text-sm text-[#818086]">
            {{ $t("in_transaction") }}
          </p>
          <h3 class="font-500 text-xl text-black">5</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "vue-chartjs";

const data = ref<ChartData<"line">>({
  labels: ["晨", "午", "晚"],
  datasets: [
    {
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
});

const options = ref<ChartOptions<"line">>({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
});
</script>
