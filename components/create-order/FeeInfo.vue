<template>
  <div class="detail-item">
    <div class="inline-flex items-center gap-[5px]">
      <div class="flex flex-wrap items-end text-[15px] font-semibold">
        <p class="min-w-[40px]">{{ title }}</p>
        <p class="text-[8px] font-normal">(选填)</p>
      </div>
      <Icon name="Info" color="#E1EFFF" />
    </div>
    <button class="text-[16px]" @click="$emit('click', props.type)">
      {{
        modelValue +
        ` ${props.type === FeeTypeEnum.HANDLING_FEE_PERCENTAGE ? "%" : props.type === FeeTypeEnum.OTHER_FEE ? "U" : ""}`
      }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { FeeTypeEnum, type FeeType } from "~/types/common";

const props = defineProps<{
  modelValue: number;
  type: FeeType;
}>();

defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "click", type: FeeType): void;
}>();

const title = computed(() => {
  switch (props.type) {
    case FeeTypeEnum.HANDLING_FEE_PERCENTAGE:
      return "费率";
    case FeeTypeEnum.RATE:
      return "汇率";
    case FeeTypeEnum.OTHER_FEE:
      return "其他费";
    default:
      break;
  }
});
</script>

<style scoped>
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
