<template>
  <div v-if="type === 'border'" class="box-border flex w-full rounded-[10px]">
    <div class="flex w-full items-center justify-between">
      <h2 class="px-[11px] py-[7px] text-[14px]">{{ title }}</h2>
      <slot />
    </div>
  </div>
  <div v-else class="flex w-full justify-between">
    <h2 class="text-[17px]">{{ title }}</h2>
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
  border: 1px solid #d9d9d9;
}
</style>
