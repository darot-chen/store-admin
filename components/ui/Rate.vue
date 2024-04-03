<template>
  <div class="inline-flex">
    <div v-for="i in count || 5" :key="i + 'star'" class="cursor-pointer">
      <Icon
        name="Star"
        :color="props.score >= i ? '#FFD700' : '#cccccc'"
        size="20"
        @click="$emit('update:score', i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  score: number;
  count?: number;
}>();

defineEmits<{
  (e: "update:score", value: number): void;
}>();
</script>
