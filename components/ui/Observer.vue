<template>
  <div ref="root" />
</template>

<script setup lang="ts">
const props = defineProps<{ options?: IntersectionObserverInit }>();
const emit = defineEmits(["intersect"]);
const root = ref<Element | null>(null);
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit("intersect");
    }
  }, props.options);
  observer.value.observe(root.value as Element);
});

onUnmounted(() => {
  if (observer.value === null) return;
  observer.value.disconnect();
});
</script>
