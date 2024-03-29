<template>
  <button class="container relative h-10" @click="$emit('click')">
    <p>{{ title }}</p>
    <Icon
      name="Arrow"
      color="#fff"
      size="12"
      class="absolute right-0 top-0 mr-[0.09rem] mt-[0.12rem]"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();

defineEmits<{
  click: [];
}>();
</script>

<style scoped lang="css">
.container {
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.125rem;
  border-radius: 0.375rem;
}
</style>
