<template>
  <button
    :class="['inline-flex items-center gap-[9px]', disabled && 'disabled']"
    @click="onClick"
  >
    <img
      v-if="selected?.icon"
      :src="selected.icon"
      :alt="selected.label"
      class="w-[18px] rounded-full"
    />
    <div class="inline-flex items-center gap-[16px]">
      <p>{{ selected?.label }}</p>
      <Icon name="Caret" color="#3C3C43" size="14" class="opacity-30" />
    </div>
  </button>
  <VanPopup v-model:show="showPopup" round :style="{ padding: '64px' }">
    sdsd
  </VanPopup>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";

const showPopup = ref(false);

const props = defineProps<{
  option: Option[];
  modelValue: string;
  disabled?: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const selected = computed(() => {
  return props.option.find((item) => item.value === props.modelValue);
});

function onClick() {
  if (!props.disabled) {
    // showPopup.value = !showPopup.value;
  }
}
</script>

<style scoped>
.disabled {
  color: rgba(60, 60, 67, 0.6);
}
</style>
