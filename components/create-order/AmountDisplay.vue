<template>
  <div class="container py-[12px]">
    <div class="detail mx-[12px] items-center">
      <div class="detail-item">
        <div class="inline-flex items-center gap-[5px]">
          <h1 class="text-[15px] font-semibold">汇率</h1>
          <Icon name="Info" color="#E1EFFF" />
        </div>
        <p class="text-[16px]">{{ fee.platformRate }}%</p>
      </div>
      <UiDivider />
      <div class="detail-item">
        <div class="inline-flex items-center gap-[5px]">
          <h1 class="text-[15px] font-semibold">费率</h1>
          <Icon name="Info" color="#E1EFFF" />
        </div>
        <p class="text-[16px]">{{ rateComputed?.price || 0 }}</p>
      </div>
      <UiDivider />
      <div class="detail-item">
        <div class="inline-flex items-center gap-[5px]">
          <h1 class="text-[15px] font-semibold">其他费</h1>
          <Icon name="Info" color="#E1EFFF" />
        </div>
        <p class="text-[16px]">{{ fee.otherFee }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rate } from "~/types/rate";

const props = defineProps<{
  fee: {
    platformRate: number;
    otherFee: number;
  };
  rate?: Rate;
}>();

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

.detail-item {
  color: #e1efff;
  display: flex;
  height: 62px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  flex: 1 0 0;
}
</style>
