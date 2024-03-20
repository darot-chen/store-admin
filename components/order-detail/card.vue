<template>
  <div class="m-4 rounded-b-lg bg-[#EAEFFB]">
    <div
      class="relative flex h-full flex-col space-y-1 rounded-xl bg-white px-3 pb-3"
    >
      <div class="!mb-7 flex items-center gap-x-2">
        <!-- Amount Transaction -->
        <div class="flex items-center pt-3">
          <Icon name="cryptocurrency-color:usdc" size="41" color="#3e73c4" />
          <div>
            <p class="text-amount !text-[24px] font-bold leading-7">
              {{ order?.amount.toFixed(2) }}
            </p>
            <p class="text-amount !text-[10px] font-bold leading-3">
              ≈ {{ order?.amount_to_be_paid.toFixed(2) }}
              {{ order?.base_currency }}
            </p>
          </div>
        </div>
        <div
          class="din-alternate-text absolute right-0 top-0 mr-3 rounded-b-lg bg-[#EAEFFB] px-3 py-1 text-center text-[#2F4A84]"
        >
          <p class="text-[10px] font-bold leading-3">担保订单</p>
          <p class="text-[12px] font-bold leading-3">
            {{ formatOrderId(order?.id || 0) }}
          </p>
        </div>
      </div>

      <!-- Detail -->
      <div
        class="flex items-center justify-between border-b border-dashed pb-2"
      >
        <p>
          <span class="text-label"> 本日总入款金额(笔)</span>
          <span class="text-amount">{{
            order?.amount_to_be_paid.toVFixed(2)
          }}</span>
        </p>
        <p>
          <span class="text-label">{{ lobbyTitle.split(" ")[0] }} </span>
          <span class="text-amount pr-2">{{ lobbyTitle.split(" ")[1] }}</span>
          <span class="text-label">{{ lobbyTitle.split(" ")[2] }}</span>
          <span class="text-amount">{{ lobbyTitle.split(" ")[3] }}</span>
        </p>
      </div>
      <div
        class="flex w-full items-center justify-between gap-x-3 pt-1 text-[11px]"
      >
        <p>
          <span class="text-label">费率(%) </span>
          <span class="text-amount">{{ order?.handling_fee_percentage }}</span>
          <span class="text-amount pr-2"> | </span>
          <span class="text-label">汇率 </span>
          <span class="text-amount">{{ order?.exchange_rate }}</span>
        </p>
        <p>
          <span class="text-label">其他费</span>
          <span class="text-label din-alternate-text">(U)</span>
          <span class="text-amount">{{ order?.total_commission }}</span>
        </p>
      </div>
      <div class="flex w-full justify-between gap-x-3">
        <p>
          <span class="text-label">平台佣金</span>
          <span class="text-label din-alternate-text">
            ({{ order?.base_currency }})
          </span>
          <span class="text-amount">51.88</span>
        </p>
        <p>
          <span class="text-label"> 佣金支付方</span>
          <span class="pl-2 text-[12px] !text-[#2F4A84]">@moon1688</span>
        </p>
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-y-2 p-3">
      <div
        class="din-alternate-text flex items-center rounded-lg bg-white px-3 py-1 text-[#50A7EA]"
      >
        <p class="text-[12px]">2017年09月17日 ~ 2019年12月18日</p>
        <p class="mx-2 text-[12px]">|</p>
        <button>
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
  </div>
</template>

<script setup lang="ts">
import type { Order } from "~/types/order";

defineProps<{ order?: Order; lobbyTitle: string }>();
</script>

<style scoped>
.text-amount {
  @apply pl-2 text-[16px] font-bold text-[#2F4A84];
  font-family: "DIN ALTERNATE";
}

.text-label {
  @apply text-[12px] text-[#2F4A84] opacity-50;
}
</style>
