<template>
  <div class="inline-flex items-center justify-end gap-[5px]">
    <input
      class="max-w-1/3 text-end"
      :value="modelValue"
      :type="type"
      :required="required"
      @focus="$emit('focus')"
      @input="onInput"
    />
    <span v-if="isPercent">%</span>
    <img v-if="icon" :src="icon" :alt="icon" class="w-[18px] rounded-full" />
    <button class="inline-flex items-center justify-center" @click="onReset">
      <Icon name="X" color="#cccccc" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  modelValue?: string | number;
  required?: boolean;
  type?: "text" | "number";
  isPercent?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "focus"): void;
}>();

function onInput(event: Event) {
  if (props.isPercent) {
    const value = (event.target as HTMLInputElement).value;
    if (+value <= 100) {
      return emits("update:modelValue", value);
    }
  }

  return emits("update:modelValue", (event.target as HTMLInputElement).value);
}

function onReset() {
  if (props.type === "number") {
    return emits("update:modelValue", 0);
  }
  emits("update:modelValue", "");
}
</script>
