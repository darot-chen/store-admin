<template>
  <div class="flex w-full items-center">
    <div class="inline-flex items-center gap-[10px] pr-[16px]">
      <VanSwitch
        v-model="showRealtimeExchangeRate"
        size="15"
        @change="
          () =>
            emit('update:showRealtimeExchangeRate', showRealtimeExchangeRate)
        "
      />
      <p v-if="!showRealtimeExchangeRate" class="text-[#50A7EA]">
        {{ $t("merchant real-time transaction exchange rate") }}
      </p>
      <button class="border-r pr-[10px]">
        <Icon name="Info" color="#C5DBF0" />
      </button>
    </div>
    <div v-if="showRealtimeExchangeRate" class="inline-flex gap-[16px]">
      <button
        v-for="item in paymentMethods"
        :key="item.value"
        :style="{
          color: selectedPaymentMethod === item ? '#FF9900' : '#787A8D',
        }"
        @click="() => $emit('update:selectedPaymentMethod', item)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
  <div v-if="showRealtimeExchangeRate" class="table-border w-full">
    <div
      class="flex items-start justify-between border-b border-[#FAFAFA] px-[16px] py-[11px] text-[14px] text-[#787A8D]"
    >
      <div class="inline-flex flex-1 items-center gap-[10px]">
        <p>姓名</p>
        <button>
          <Icon name="Info" color="#C5DBF0" />
        </button>
      </div>
      <div
        class="inline-flex flex-1 items-center justify-center gap-[10px] pr-[16px]"
      >
        <p>汇率</p>
        <button>
          <Icon name="UpDown" />
        </button>
      </div>
    </div>
    <div class="grid py-[10px] text-[12px]">
      <div
        v-for="(item, index) in rates"
        :key="index"
        :class="[
          'grid grid-cols-2 px-[16px]',
          index === 0
            ? 'border-b border-[#FAFAFA] pb-[10px]'
            : index === rates.length - 1
              ? 'pt-[10px]'
              : 'border-b border-[#FAFAFA] pb-[10px] pt-[10px]',
        ]"
      >
        <div
          class="inline-flex w-[126px] items-center justify-between gap-[10px] py-[11px]"
        >
          <div class="inline-flex w-2/3 items-center gap-1">
            <p :style="{ color: index <= 2 ? '#FF9900' : '' }">
              {{ index + 1 }}
            </p>
            <p class="line-clamp-1 text-ellipsis">
              {{ item.nickName }}
            </p>
          </div>
          <VanSwitch
            class="w-1/3"
            :model-value="selectedRate?.id === item.id"
            size="10.5"
            @change="
              () => {
                if (selectedRate?.id === item.id) {
                  $emit('update:selectedRate', undefined);
                } else {
                  $emit('update:selectedRate', item);
                }
              }
            "
          />
        </div>
        <div class="flex items-center justify-end gap-[10px] py-[11px]">
          <CreateOrderRateCounter
            :model-value="item"
            @update:model-value="(value) => onRateAmountChange(value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";
import type { Rate } from "~/types/rate";

const props = defineProps<{
  showRealtimeExchangeRate: boolean;
  rates: Rate[];
  paymentMethods: Option[];
  selectedRate?: Rate;
  selectedPaymentMethod: Option;
}>();

const rates = ref(props.rates);
const showRealtimeExchangeRate = ref(props.showRealtimeExchangeRate);

watch(
  () => props.rates,
  (newVal) => {
    rates.value = newVal;
  }
);

const emit = defineEmits<{
  (e: "update:selectedPaymentMethod", value: Option): void;
  (e: "update:selectedRate", value: Rate | undefined): void;
  (e: "update:showRealtimeExchangeRate", value: boolean): void;
}>();

function onRateAmountChange(value: Rate) {
  if (!props.selectedRate && value && value === props.selectedRate) return;

  rates.value = rates.value.map((item) => {
    if (item.id === value.id) {
      return value;
    }
    return item;
  });

  if (props.selectedRate?.id === value.id) {
    emit("update:selectedRate", value);
  }
}
</script>

<style scoped lang="css">
.table-border {
  border: 1px solid #fafafa;
  border-radius: 8px;
}
</style>
