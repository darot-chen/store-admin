<template>
  <div class="mt-[20px] flex flex-col gap-[24px] bg-white px-[20px] py-[20px]">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <p class="font-400 text-base text-[#818086]">本周交易总额</p>
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
          <span style="color: #5abf5f" class="text-xs">往时总额</span>
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
          <span style="color: #c75a5a" class="text-xs">往时总额</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <UiDivider class="m-0 mb-[5px] w-full border-t border-[#CCC]" />
      <p class="font-500 place-self-center text-xs text-black">
        Jan,2 2024 at 6:00 in the morning
      </p>
      <Line :data="data" :options="options" />
      <div class="flex flex-row items-center justify-around">
        <div class="flex flex-col items-center">
          <p class="font-500 text-sm text-[#818086]">交易总额</p>
          <h3 class="font-500 text-xl text-black">1,260,000</h3>
        </div>
        <div class="h-[20px] w-[1px] dark:bg-[#CCC]" />
        <div class="flex flex-col items-center">
          <p class="font-500 text-sm text-[#818086]">交易中</p>
          <h3 class="font-500 text-xl text-black">5</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  type ChartData,
  type ChartOptions,
} from "chart.js";

import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data: ChartData<"line"> = {
  labels: ["晨", "午", "晚"],
  datasets: [
    {
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    yAxes: [
      {
        display: true,
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
      {
        display: true,
        position: "left",
        ticks: {
          beginAtZero: true,
          max: 45,
          min: 0,
          stepSize: 5,
        },
      },
    ],
  },
  plugins: {
    legend: {
      display: false,
    },
  },

  // backgroundColor: "rgba(244, 144, 128, 0.8)",
  // showLine: true,
};
</script>
