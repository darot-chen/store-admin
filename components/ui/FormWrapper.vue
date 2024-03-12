<template>
  <div
    v-if="type === 'border'"
    v-bind="$attrs"
    class="box-border flex w-full rounded-[10px]"
  >
    <div class="flex w-full items-center justify-between">
      <h2 class="px-[11px] py-[7px]">{{ title }}</h2>
      <slot />
    </div>
  </div>
  <div v-else v-bind="$attrs" class="flex w-full justify-between">
    <div class="inline-flex items-center gap-[4px]">
      <h2 class="text-[12px]">{{ title }}</h2>
      <slot name="icon" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  type?: "border";
}>();
</script>

<style scoped lang="css">
.box-border {
  border: 0.5px solid #0000001a;
}
</style>
