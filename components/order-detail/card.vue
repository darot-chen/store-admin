<template>
  <div
    class="mx-7 mt-4 rounded-xl bg-gradient-to-r from-[#2E4982] to-[#2B62B6] p-3"
  >
    <div class="relative flex h-full flex-col space-y-1 text-white">
      <p class="text-[11px] text-black">{{ lobbyTitle }}</p>
      <p class="text-[11px] font-bold">本日总入款金额 （3笔）</p>
      <div class="!mb-4 flex items-center gap-x-2">
        <Icon name="cryptocurrency-color:usdc" size="32" color="#3e73c4" />
        <div>
          <p class="text-[16px]">{{ order?.amount }}</p>
          <p class="text-[8px]">
            ≈ {{ order?.amount_to_be_paid }} {{ order?.base_currency }}
          </p>
        </div>
      </div>
      <div class="flex w-full gap-x-3 text-[11px]">
        <p>
          费率：{{ order?.handling_fee_percentage }}% | 汇率：{{
            order?.exchange_rate
          }}
        </p>
        <p>其他费: {{ order?.total_commission }}u</p>
      </div>
      <div class="flex w-full gap-x-3 text-[11px]">
        <p>平台佣金: USDT 51.00</p>
        <p>
          佣金支付方:
          {{ order?.commission_paid_by === "seller" ? "供方付" : "买家付款" }}
        </p>
      </div>
      <div class="wallet-badge absolute -right-3 top-0 pl-4 pr-2">
        <p class="w-[72px] text-center">
          担保订单：<br />{{ formatOrderId(order?.id || 0) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from "~/types/order";

defineProps<{ order?: Order; lobbyTitle: string }>();
</script>

<style scoped>
.wallet-badge {
  @apply rounded-l-full bg-gradient-to-r from-[#E0F3FD] to-[#C3DCFF] text-[11px] text-black drop-shadow-lg;
}
</style>
