<template>
  <button
    class="my-[7px] flex h-[30px] w-[30px] flex-col items-center justify-center rounded-full border"
    @click="onMinus"
  >
    <Icon name="Minus" color="#b7b7b7" />
    <p class="text-[8px] text-[#000000BF]">0.01</p>
  </button>

  <div class="w-[43px] bg-[#FAFAFA] text-center">
    <input
      v-model="modelValue.price"
      class="w-[27px] bg-[#FAFAFA] px-[1px] text-center text-[14px] text-[#787A8D]"
    />
  </div>

  <button
    class="my-[7px] flex h-[30px] w-[30px] flex-col items-center justify-center rounded-full border"
    @click="onPlus"
  >
    <Icon name="Plus" color="#b7b7b7" />
    <p class="text-[8px] text-[#000000BF]">0.01</p>
  </button>
</template>

<script setup lang="ts">
import type { Rate } from "~/types/rate";

const props = defineProps<{
  modelValue: Rate;
}>();

const modelValue = ref(props.modelValue);

const emit = defineEmits<{
  (e: "update:modelValue", value: Rate): void;
}>();

function onPlus() {
  emit("update:modelValue", {
    ...props.modelValue,
    price: props.modelValue ? (+props.modelValue.price + 0.01).toFixed(2) : "0",
  });
}

function onMinus() {
  emit("update:modelValue", {
    ...props.modelValue,
    price: props.modelValue ? (+props.modelValue.price - 0.01).toFixed(2) : "0",
  });
}

watch(
  () => props.modelValue,
  (newVal) => {
    modelValue.value = newVal;
  }
);
</script>
