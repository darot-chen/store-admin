<template>
  <div
    class="flex w-full flex-1 flex-col items-center gap-[3px] rounded-[10px] bg-white px-[5px] py-[7px] text-center"
    :style="{
      color: color ?? '#000',
    }"
  >
    <div class="inline-flex items-center gap-[6px]">
      <Icon :name="icon" :color="color ?? '#000'" size="16" />
      <p class="text-[12px] font-medium">
        {{ title }}
      </p>
    </div>
    <p class="font-semibold">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  value: string;
  color?: string;
}>();
</script>
