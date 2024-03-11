<template>
  <div class="flex justify-between">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="checkbox gap-2"
      @click="$emit('update:modelValue', index)"
    >
      <div class="flex items-center">
        <input
          type="radio"
          style="height: 20px; width: 20px"
          :checked="modelValue === index"
        />
        <Icon
          v-if="modelValue === index"
          name="Check"
          class="absolute"
          size="14"
          style="margin-left: 3px"
        />
      </div>

      <p class="text-[14px] text-[#8e8e93]">{{ option.label }}</p>
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
  (e: "update:modelValue", value: number): void;
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
