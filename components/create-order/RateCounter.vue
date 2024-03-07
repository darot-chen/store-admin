<template>
  <button
    class="flex h-[30px] w-[30px] flex-col items-center justify-center rounded-full border p-[4px]"
    @click="onMinus"
  >
    <Icon name="Minus" color="#b7b7b7" size="15px" />
  </button>
  <div class="w-[43px] bg-[#FAFAFA] text-center">
    <input
      class="w-[27px] bg-[#FAFAFA] px-[1px] text-center text-[14px] text-[#787A8D]"
    />
  </div>
  <button
    class="flex h-[30px] w-[30px] flex-col items-center justify-center rounded-full border p-[4px]"
    @click="onPlus"
  >
    <Icon name="Plus" color="#b7b7b7" size="15px" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

function onPlus() {
  emit("update:modelValue", props.modelValue + 1);
}

function onMinus() {
  emit("update:modelValue", props.modelValue - 1);
}
</script>
