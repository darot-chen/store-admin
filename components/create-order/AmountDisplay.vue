<template>
  <div class="container py-[12px]">
    <div class="detail mx-[12px] items-center">
      <FeeInfo
        type="platformRate"
        :value="fee.platformRate"
        @click="$emit('feeClick', 'platformRate', fee.platformRate)"
      />
      <UiDivider />
      <FeeInfo
        type="price"
        :value="rateComputed?.price ?? fee.exchangeRate"
        @click="
          $emit(
            'feeClick',
            'exchange_rate',
            rateComputed?.price ?? fee.exchangeRate
          )
        "
      />
      <UiDivider />
      <FeeInfo
        type="otherFee"
        :value="fee.otherFee || 0"
        @click="$emit('feeClick', 'otherFee', fee.otherFee)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rate } from "~/types/rate";
import FeeInfo from "./FeeInfo.vue";

const props = defineProps<{
  fee: {
    platformRate: number;
    otherFee: number;
    exchangeRate: number;
  };
  rate?: Rate;
}>();

defineEmits(["feeClick"]);

const rateComputed = computed(() => {
  return props.rate;
});
</script>

<style scoped lang="css">
.detail {
  display: flex;
  padding: 16px;
  gap: 5px;
  border-radius: 8px;
  background: url("/images/bg-detail.png") no-repeat center center;
  background-blend-mode: color, normal;
  box-shadow:
    0px 4px 10px 0px rgba(92, 177, 255, 0.26),
    0px 0px 9px 0px rgba(255, 255, 255, 0.75) inset;
  filter: drop-shadow(0px 10px 50px rgba(92, 177, 255, 1));
}
</style>
