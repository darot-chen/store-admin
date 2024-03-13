<template>
  <div
    class="bg-avatar"
    :style="{
      background: !imageSource ? generateLinearGradient(name!) : undefined,
      width: size ?? '2.375rem',
      height: size ?? '2.375rem',
    }"
    @click="emit('clicked')"
  >
    <img v-if="imageSource" class="rounded-full" :src="getS3Url(imageSource)" />
    <p v-else>{{ name!.charAt(0).toUpperCase() }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageSource?: string;
  name: string;
  size: string;
}>();

const emit = defineEmits<{
  clicked: [];
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
