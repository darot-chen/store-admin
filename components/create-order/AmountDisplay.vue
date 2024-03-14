<template>
  <div class="container py-[12px]">
    <div class="detail mx-[12px] items-center">
      <CreateOrderFeeInfo
        v-model="componentProps.handlingFeePercentage"
        :type="FeeTypeEnum.HANDLING_FEE_PERCENTAGE"
        @click="onClick"
      />
      <UiDivider />
      <CreateOrderFeeInfo
        v-model="componentProps.rate.price"
        :type="FeeTypeEnum.RATE"
        @click="onClick"
      />
      <UiDivider />
      <CreateOrderFeeInfo
        v-model="componentProps.otherFee"
        :type="FeeTypeEnum.OTHER_FEE"
        @click="onClick"
      />
    </div>
  </div>

  <VanDialog
    v-model:show="showUpdateFee"
    show-cancel-button
    title="更新"
    @confirm="onConfirmUpdate"
  >
    <div style="margin: 10px">
      <VanField
        v-if="feeType === FeeTypeEnum.HANDLING_FEE_PERCENTAGE"
        v-model:model-value="componentProps.handlingFeePercentage"
        class="fee-input"
        autofocus
        clearable
        type="number"
        placeholder="0"
        :border="true"
        @update:model-value="
          (v) => {
            componentProps.handlingFeePercentage = Number(v);
          }
        "
      />
      <VanField
        v-else-if="feeType === FeeTypeEnum.RATE"
        v-model:model-value="componentProps.rate.price"
        class="fee-input"
        clearable
        type="number"
        autofocus
        placeholder="0"
        :border="true"
        @update:model-value="
          (v) => {
            componentProps.rate.price = Number(v);
          }
        "
      />
      <VanField
        v-else
        :model-value="componentProps.otherFee"
        class="fee-input"
        type="number"
        autofocus
        clearable
        placeholder="0"
        :border="true"
        @update:model-value="
          (v) => {
            componentProps.otherFee = Number(v);
          }
        "
      />
    </div>
  </VanDialog>
</template>

<script setup lang="ts">
import type { Rate } from "~/types/rate";
import { FeeTypeEnum, type FeeType } from "~/types/common";

const feeType = ref<FeeType>(FeeTypeEnum.HANDLING_FEE_PERCENTAGE);
const showUpdateFee = ref<boolean>(false);

const props = defineProps<{
  handlingFeePercentage: number;
  otherFee: number;
  rate?: Rate;
}>();

const componentProps = ref({
  ...props,
  rate: {
    ...props.rate,
    price: Number(props.rate?.price) || 1,
  },
});

const emit = defineEmits<{
  (e: "update:handlingFeePercentage", value: number): void;
  (e: "update:otherFee", value: number): void;
  (e: "update:rate", value: Rate): void;
  (e: "change"): void;
}>();

watch(
  () => props,
  (newProps) => {
    componentProps.value = {
      ...newProps,
      rate: {
        ...newProps.rate,
        price: Number(newProps.rate?.price) || 1,
      },
    };
  },
  { deep: true }
);

function onClick(type: FeeType) {
  feeType.value = type;
  showUpdateFee.value = true;
}

function onConfirmUpdate() {
  switch (feeType.value) {
    case FeeTypeEnum.HANDLING_FEE_PERCENTAGE:
      emit(
        "update:handlingFeePercentage",
        componentProps.value.handlingFeePercentage
      );
      emit("change");
      break;
    case FeeTypeEnum.RATE:
      if (!componentProps.value.rate) {
        showUpdateFee.value = false;
        return;
      }
      emit("update:rate", {
        ...componentProps.value.rate,
        price: componentProps.value.rate.price.toString(),
      } as Rate);
      emit("change");
      break;
    case FeeTypeEnum.OTHER_FEE:
      emit("update:otherFee", componentProps.value.otherFee);
      emit("change");
      break;
    default:
      break;
  }
}
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

.fee-input {
  border-radius: 10px;
  border: 0.5px solid rgba(120, 122, 141, 0.25);
}
</style>
