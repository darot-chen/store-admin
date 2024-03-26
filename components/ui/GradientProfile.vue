<template>
  <div
    class="bg-avatar"
    :style="{
      background: !src ? generateLinearGradient(name!) : undefined,
      width: size ?? '2.375rem',
      height: size ?? '2.375rem',
    }"
    @click="emit('click')"
  >
    <img v-if="src" class="rounded-full" :src="getS3Url(src)" />
    <p v-else>{{ name!.charAt(0).toUpperCase() }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  size?: string;
  src?: string;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<style lang="css">
.bg-avatar {
  border-radius: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  color: white;
}
</style>
