<template>
  <div v-bind="$attrs">
    <p>
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  name?: string;
}>();

const message = computed(() => {
  return getChatEvent(props.text, props.name);
});
</script>
