<template>
  <button v-bind="$attrs" class="flex w-full items-center pr-2">
    <div class="flex-1 text-left">
      <p class="text-[12px] text-sm text-[#0000004d]">
        {{ selected?.label }}
      </p>
    </div>
    <div
      :class="['inline-flex items-center gap-[5px]', disabled && 'disabled']"
      @click="onClick"
    >
      <div :class="['inline-flex items-center gap-[5px]']" @click="onClick">
        <Icon name="ArrowDown" color="#0000001A" size="9" />

        <img :src="getIcon()" alt="" :width="16" />
        <!-- <img :src="USDT" alt="" :width="16" />
      <img :src="USD" alt="" :width="16" />
      <img :src="PHP" alt="" :width="16" /> -->
      </div>
    </div>
  </button>

  <VanPopup v-model:show="showPopup" round class="popup">
    <div class="sticky top-0 z-10 bg-white pb-3 pt-5">
      <h1 v-if="title" class="text-[16px] font-semibold">{{ title }}</h1>
    </div>
    <VanCellGroup>
      <VanCell
        v-for="item in props.option"
        :key="item.value"
        :title="item.label"
        class="!text-[16px]"
        is-link
        @click="onOptionClick(item)"
      />
    </VanCellGroup>
  </VanPopup>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";
import CNY from "~/assets/currency/CNY.svg";
import USDT from "~/assets/currency/USDT.svg";
import USD from "~/assets/currency/USD.svg";
import PHP from "~/assets/currency/PHP.svg";

const showPopup = ref(false);

const props = defineProps<{
  option: Option[];
  modelValue: number;
  disabled?: boolean;
  title?: string;
}>();

const getIcon = (): string => {
  switch (selected.value?.label) {
    case "CNY":
      return CNY;
    case "USDT":
      return USDT;
    case "USD":
      return USD;
    case "PHP":
      return PHP;
    default:
      return CNY;
  }
};

const selected = computed(() => {
  return props.option.find(
    (item: Option) => item.value === props.modelValue.toString()
  );
});

const emits = defineEmits<{
  (e: "update:modelValue", value: Option): void;
}>();

function onClick() {
  if (!props.disabled) {
    showPopup.value = !showPopup.value;
  }
}

function onOptionClick(value: Option) {
  emits("update:modelValue", value);
  showPopup.value = false;
}
</script>

<style scoped>
.disabled {
  color: rgba(60, 60, 67, 0.6);
}

.popup {
  width: 90%;
  max-width: 400px;
  max-height: 600px;
  margin: 0 auto;
  padding: 0rem 1rem 1rem 1rem;
}
</style>
