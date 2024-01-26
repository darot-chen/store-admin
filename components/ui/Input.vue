<template>
  <div class="inline-flex items-center justify-end gap-[5px]">
    <input
      class="max-w-1/3 text-end"
      :value="modelValue"
      @input="
        ($event) =>
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <img v-if="icon" :src="icon" :alt="icon" class="w-[18px] rounded-full" />
    <button class="inline-flex items-center justify-center" @click="onReset">
      <Icon name="X" color="#cccccc" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string;
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onReset() {
  emits("update:modelValue", "");
}
</script>
