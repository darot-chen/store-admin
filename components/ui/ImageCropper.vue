<template>
  <div class="flex flex-col">
    <Cropper
      :src="imageSrc"
      class="h-96"
      image-class="cropper__image"
      :stencil-component="CircleStencil"
    />
  </div>
</template>

<script setup lang="ts">
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const { imageSrc } = defineProps<{
  imageSrc: string | ArrayBuffer | null | undefined;
}>();

defineComponent({
  components: {
    Cropper,
  },
});
</script>
