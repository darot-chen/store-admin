<template>
  <button class="container relative" @click="$emit('click')">
    <p>{{ title }}</p>
    <Icon
      name="Caret"
      color="#fff"
      size="12"
      class="rotate-diagonal absolute right-0 top-0 mr-[0.09rem] mt-[0.12rem]"
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
  padding: 0.69rem 3.44rem;
}
</style>
