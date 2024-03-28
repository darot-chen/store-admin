<template>
  <img
    v-bind="$attrs"
    :src="getProvider(src, provider)"
    :width="width"
    :height="height"
    :alt="alt"
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  placeholder?: [number, number];
  provider?: "s3";
  width?: number | string;
  height?: number | string;
  alt?: string;
}>();

function getProvider(src: string, provider?: string) {
  switch (provider) {
    case "s3":
      return getS3Url(src);
    default:
      return `/images/${src}`;
  }
}
</script>
