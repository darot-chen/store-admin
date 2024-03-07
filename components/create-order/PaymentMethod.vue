<template>
  <div class="flex w-full items-center">
    <div class="inline-flex items-center gap-[10px] pr-[16px]">
      <VanSwitch v-model="showRealtimeExchangeRate" size="15" />
      <p v-if="!showRealtimeExchangeRate" class="text-[#50A7EA]">
        {{ $t("merchant real-time transaction exchange rate") }}
      </p>
      <button class="border-r pr-[10px]">
        <Icon name="Info" color="#C5DBF0" />
      </button>
    </div>
    <div v-if="showRealtimeExchangeRate" class="inline-flex gap-[16px]">
      <button
        v-for="item in options"
        :key="item.value"
        :class="[
          item.value === paymentMethod ? 'text-[#50A7EA]' : 'text-[#787A8D]',
        ]"
        @click="() => $emit('update:paymentMethod', item.value)"
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
        <Icon name="Info" color="#C5DBF0" />
      </div>
      <div class="inline-flex flex-1 items-center gap-[10px] pr-[16px]">
        <p class="w-full text-center">汇率</p>
      </div>
    </div>
    <div class="grid py-[10px] text-[12px]">
      <div
        v-for="(item, index) in exchangeRate"
        :key="index"
        :class="[
          'grid grid-cols-2 px-[16px]',
          index === 0
            ? 'border-b border-[#FAFAFA] pb-[10px]'
            : index === exchangeRate.length - 1
              ? 'pt-[10px]'
              : 'border-b border-[#FAFAFA] pb-[10px] pt-[10px]',
        ]"
      >
        <div class="inline-flex items-center gap-[10px] py-[11px]">
          <div class="inline-flex items-center gap-1">
            <p :class="[index <= 2 && 'text-[#FF9900]']">{{ index + 1 }}</p>
            <p>{{ item.title }}</p>
          </div>
          <VanSwitch v-model="item.selected" size="10.5" />
        </div>
        <div class="flex items-center justify-end gap-[10px] py-[11px]">
          <CreateOrderRateCounter />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";

const showRealtimeExchangeRate = ref(false);

defineProps<{
  paymentMethod: string;
  options: Option[];
}>();

const exchangeRate = [
  {
    title: "守规矩的蚂蚱",
    selected: false,
  },
  {
    title: "守规矩的蚂蚱",
    selected: false,
  },
  {
    title: "守规矩的蚂蚱",
    selected: false,
  },
  {
    title: "守规矩的蚂蚱",
    selected: false,
  },
  {
    title: "守规矩的蚂蚱",
    selected: false,
  },
];

defineEmits<{
  (e: "update:paymentMethod", value: string): void;
}>();
</script>

<style scoped lang="css">
.table-border {
  border: 1px solid #fafafa;
  border-radius: 8px;
}
</style>
