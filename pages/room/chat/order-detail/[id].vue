<template>
  <div>
    <OrderDetailCard />
    <!-- Button List -->
    <div class="flex justify-center gap-x-2 text-[11px] text-white">
      <div
        v-for="(title, index) in titles"
        :key="index"
        class="my-2 rounded-md bg-[#50A7EA] px-2 py-1"
      >
        {{ title }}
      </div>
    </div>
    <!-- Issue/Deposit Titles -->
    <div class="my-2 h-[2px] bg-[#E0E6EB]"></div>
    <div class="my-3 flex justify-center">
      <div class="flex w-1/2 items-center justify-center">
        <p class="text-[10px] font-bold">（2笔）</p>
        <p class="text-[14px] text-red-500">下发</p>
      </div>
      <div class="flex w-1/2 items-center justify-start">
        <p class="text-[14px] text-green-500">入款</p>
        <p class="text-[10px] font-bold">（3笔）</p>
      </div>
    </div>
    <div class="my-2 h-[2px] bg-[#E0E6EB]"></div>
    <!-- Transaction List -->
    <div
      v-for="(trans, index) in orderTransactions"
      :key="index"
      class="flex border-b-2 px-4 py-4"
    >
      <!-- Issue -->
      <div v-if="!trans.issue" class="w-1/2"></div>
      <OrderDetailTransaction
        v-else
        type="issue"
        :date="trans.issue?.date ?? ''"
        :amount="trans.issue?.amount ?? 0"
        :exchange-amount="trans.issue?.exchangeAmount ?? 0"
      />
      <!-- Deposit -->
      <div v-if="!trans.deposit" class="w-1/2"></div>
      <OrderDetailTransaction
        v-else
        type="deposit"
        :date="trans.deposit?.date ?? ''"
        :amount="trans.deposit?.amount ?? 0"
        :exchange-amount="trans.deposit?.exchangeAmount ?? 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const pageStore = usePageStore();

const titles: string[] = ["2022年8月25日", "订单BS000002", "全部流水"];

type Transaction = {
  date: string;
  amount: number;
  exchangeAmount: number;
};

type OrderTransaction = {
  issue?: Transaction;
  deposit?: Transaction;
};

const orderTransactions: OrderTransaction[] = [
  {
    issue: {
      date: "15:25:59",
      amount: 228000.0,
      exchangeAmount: 223529.41,
    },
    deposit: {
      date: "15:25:00",
      amount: 200000.0,
      exchangeAmount: 20400,
    },
  },
  {
    deposit: {
      date: "15:24:00",
      amount: 200000.0,
      exchangeAmount: 20400,
    },
  },
  {
    issue: {
      date: "15:24:59",
      amount: 180000.0,
      exchangeAmount: 176470.59,
    },
    deposit: {
      date: "15:25:00",
      amount: 228000.0,
      exchangeAmount: 232560.58,
    },
  },
];

onMounted(() => {
  pageStore.setTitle("显示账单");
});
</script>
