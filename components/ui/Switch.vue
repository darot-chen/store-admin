<template>
  <div class="switch-container">
    <button
      v-for="option in options"
      :key="option.value"
      :class="[
        'flex-1',
        {
          active: modelValue.value === option.value,
        },
      ]"
      @click="$emit('update:modelValue', option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";

defineProps<{
  options: Option[];
  modelValue: Option;
}>();

defineEmits<{
  (e: "update:modelValue", value: Option): void;
}>();
</script>

<style scoped lang="css">
.switch-container {
  display: inline-flex;
  background-color: rgba(118, 118, 128, 0.12);
  width: 100%;
  height: 28px;
  padding: 2px;
  align-items: center;
  border-radius: 9px;
}

.switch-container div {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
}

.active {
  background-color: #ffff;
  border-radius: 7px;
  height: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
