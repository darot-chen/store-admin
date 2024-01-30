<template>
  <div class="inline-flex items-center justify-end gap-[5px]">
    <input
      class="max-w-1/3 text-end"
      :value="modelValue"
      :type="type"
      :required="required"
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
const props = defineProps<{
  icon?: string;
  modelValue?: string | number;
  required?: boolean;
  type?: "text" | "number";
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

function onReset() {
  if (props.type === "number") {
    return emits("update:modelValue", 0);
  }
  emits("update:modelValue", "");
}
</script>
