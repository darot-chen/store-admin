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
      :style="{ height: buttonHeight }"
      @click="$emit('update:modelValue', option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";

const props = defineProps<{
  options: Option[];
  modelValue: Option;
  buttonHeight?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: typeof props.modelValue): void;
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
  font-weight: 500;
  font-size: 13px;
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
