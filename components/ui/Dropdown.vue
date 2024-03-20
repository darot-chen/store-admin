<template>
  <button
    v-bind="$attrs"
    :class="['inline-flex items-center gap-[9px]', disabled && 'disabled']"
    @click="onClick"
  >
    <Icon
      v-if="!hideShowArrowDown"
      name="ArrowDown"
      color="#D0D0D0"
      size="14"
      class="opacity-30"
    />
    <img
      v-if="selected?.icon"
      :src="selected.icon"
      :alt="selected.label"
      class="w-[18px] rounded-full"
    />
    <div
      class="inline-flex items-center"
      :style="{
        gap: titleGap ?? '16px',
      }"
    >
      <UiGradientProfile
        v-show="isShowProfile"
        :name="selected?.label ?? ''"
        size="18px"
      />
      <p class="text-[#393939]">{{ selected?.label }}</p>
      <slot v-if="!!$slots['right-icon']" name="right-icon" />
      <Icon
        v-else
        name="Caret"
        size="14"
        color="#3C3C434D"
        class="-rotate-90"
      />
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
        @click="() => onOptionClick(item.value)"
      />
    </VanCellGroup>
  </VanPopup>
</template>

<script setup lang="ts">
import type { Option } from "~/types/common";

const showPopup = ref(false);

const props = defineProps<{
  option: Option[];
  modelValue: string;
  hideShowArrowDown?: boolean;
  disabled?: boolean;
  title?: string;
  isShowProfile?: boolean;
  titleGap?: string;
}>();

const selected = computed(() => {
  return props.option.find((item) => item.value === props.modelValue);
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onClick() {
  if (!props.disabled) {
    showPopup.value = !showPopup.value;
  }
}

function onOptionClick(value: string) {
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
