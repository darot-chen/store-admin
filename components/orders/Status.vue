<template>
  <div>
    <VanTag round class="tag" :color="color.bg" :text-color="color.text">
      {{ $t("order_status." + props.status) }}
    </VanTag>
    <span :class="'text-[10px]'" :style="{ color: color.text }">
      订单：{{ props.id }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { OrderStatusEnum, type OrderStatusType } from "~/types/history-order";

type StatusColor = {
  bg: string;
  text: string;
};

const props = defineProps<{ status: OrderStatusType; id: string | number }>();

const color = computed<StatusColor>(() => {
  switch (props.status) {
    case OrderStatusEnum.CONFIRMING:
      return { bg: "#F631401F", text: "#F63140" };

    case OrderStatusEnum.PROCESSING:
      return { bg: "#1677FF1F", text: "#1677FF" };

    case OrderStatusEnum.SUCCESS:
      return { bg: "#00B5781F", text: "#00B578" };

    case OrderStatusEnum.FAILED:
      return { bg: "#6463631F", text: "#646363" };

    default:
      return { bg: "#6463631F", text: "#646363" };
  }
});
</script>

<style lang="css" scoped>
.tag {
  @apply px-1 py-[2px] text-[11px] text-[#646363];
}
</style>
