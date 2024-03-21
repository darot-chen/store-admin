<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="h-full">
    <div v-if="props.orders.length > 0" class="container">
      <div v-for="order in props.orders" :key="order.id">
        <div>
          <div class="item">
            <div>
              <div class="row">
                <span class="title">
                  {{ order.business.title }} 房间 {{ order.chat_room_id }} -
                  {{ order?.title || $t("untitled") }}
                </span>
              </div>
              <div class="row">
                <OrdersStatus :id="order.id" :status="order.status" />
              </div>
              <div class="row">
                <span class="detail">
                  供方：{{ order.seller.name }} • 交易额：{{ order.amount }}
                  {{ order?.base_currency || "-" }} • 押金：卖家付 •
                </span>
              </div>
              <div class="row">
                <span class="detail">
                  收押金额度：{{ order?.base_currency || "-" }}
                </span>
              </div>
            </div>
            <div>
              <Icon name="ChevronRight" size="20" color="#DEDEDE" />
            </div>
          </div>
          <VanDivider
            v-if="order.id !== orders.slice(-1)[0].id"
            class="divider"
          />
        </div>
      </div>
    </div>
    <VanEmpty v-else image="search" description="No order available" />
  </div>
</template>

<script setup lang="ts">
import type { HistoryOrder } from "~/types/history-order";

const props = defineProps<{
  orders: HistoryOrder[];
}>();
</script>

<style lang="css" scoped>
.container {
  @apply w-full rounded-md bg-white px-4 py-2 font-light;
}
.item {
  @apply flex items-center justify-between;
}
.title {
  @apply text-[15px];
}
.status {
  @apply text-[#646363];
}
.row {
  @apply mb-1 flex items-center justify-start gap-2;
}

.detail {
  @apply text-[12px] text-[#8A8A8A];
}
.divider {
  @apply my-2;
}
</style>
