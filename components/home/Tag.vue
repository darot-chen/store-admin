<template>
  <div
    class="tag"
    :style="{
      background:
        type === 'telegram'
          ? 'rgba(42, 171, 238, 0.1)'
          : 'rgba(255, 97, 2, 0.1)',
      color: type === 'telegram' ? '#2AABEE' : '#FF6102',
    }"
  >
    <div class="flex items-center gap-[4px]">
      <Icon :name="type === 'telegram' ? 'Telegram' : 'Home'" size="9" />
      <p class="text-[8px]">{{ label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: "telegram" | "website";
  label: string;
}>();
</script>

<style scoped>
.tag {
  border-radius: 2.571px;
  padding: 2px 4px;
}
</style>
