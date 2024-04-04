<template>
  <div class="flex justify-start gap-x-2">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="checkbox grow gap-2 rounded-[9px]"
      :class="{
        'bg-[#F3F3F3] text-[#8E8E93]': modelValue !== index,
        'bg-[#0A7AFF] text-[#FFF]': modelValue === index,
      }"
      @click="$emit('click', index)"
    >
      <div class="w-full py-[6px] text-center" :style="{}">
        <p class="text-[14px]">{{ option.label }}</p>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";

defineProps<{
  options: Option[];
  modelValue: number;
}>();

defineEmits<{
  (e: "click", value: number): void;
}>();
</script>

<style scoped lang="css">
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.checkbox input[type="radio"] {
  height: 20px;
  width: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 4px;
  border-width: 2px;
  border-color: grey;
}

.checkbox input[type="radio"]:checked {
  border: 2px solid #007bff;
  background-color: #007bff;
  border-radius: 5px;
}
</style>
