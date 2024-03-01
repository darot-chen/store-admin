<template>
  <div class="inline-flex">
    <div v-for="i in count || 5" :key="i + 'star'">
      <Icon
        name="Star"
        :color="value >= i ? '#FFD700' : '#cccccc'"
        size="20"
        @click="() => $emit('update:value', i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number;
  count?: number;
}>();

defineEmits<{
  (e: "update:value", value: number): void;
}>();
</script>
