<template>
  <div class="flex-col px-[13.6px]">
    <div class="flex justify-between py-[5px]">
      <p class="title">{{ $t("order_number") }}</p>
      <p class="value">{{ data?.order?.id || "" }}</p>
    </div>
    <div class="flex justify-between py-[5px]">
      <p class="title">{{ $t("guaranteed_amount") }}</p>
      <p class="value">50,000 USDT</p>
    </div>
    <div class="flex justify-between py-[5px]">
      <p class="title">{{ $t("amount") }}</p>
      <p class="value">
        {{
          `${data?.order?.amount_to_be_paid || ""} ${data?.order?.buyer_currency?.code || ""}`
        }}
      </p>
    </div>
    <div class="flex justify-between py-[5px]">
      <p class="title">{{ $t("commodity") }}</p>
      <p class="value">收U代付</p>
    </div>
    <div class="flex justify-between py-[5px]">
      <p class="title">{{ $t("refund") }}</p>
      <p class="value">无</p>
    </div>
    <div class="flex justify-between py-[5px]">
      <p class="title">{{ $t("trx_completion_date") }}</p>
      <p class="value">{{ formatDate(data.order?.seller_completed_at) }}</p>
    </div>
    <div class="flex justify-between py-[5px]">
      <p class="title">{{ $t("service_quality") }}</p>
      <p class="value">
        <UiRate
          :score="props.score"
          @update:score="(s) => $emit('update:score', s)"
        />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatDetail } from "~/types/chat";

const props = defineProps<{
  data: ChatDetail;
  score: number;
}>();

defineEmits<{
  (e: "update:score", value: number): void;
}>();
</script>

<style scoped>
.title {
  overflow: hidden;
  color: #9b9b9b;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}

.value {
  color: #393939;
  text-align: right;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}
</style>
