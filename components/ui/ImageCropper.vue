<template>
  <div class="flex flex-col">
    <Cropper
      ref="cropper"
      :src="imageSrc"
      class="h-96"
      :stencil-component="CircleStencil"
    />
    <van-button
      :loading="isLoading"
      type="primary"
      class="w-full"
      :style="{
        'border-top-left-radius': '0px',
        'border-top-right-radius': '0px',
      }"
      @click="handleClick"
    >
      Upload
    </van-button>
  </div>
</template>

<script setup lang="ts">
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

defineProps<{
  imageSrc: string | ArrayBuffer | null | undefined;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  cropImage: [cropper: Ref];
}>();

const handleClick = () => {
  emit("cropImage", cropper);
};

const cropper = ref();
</script>
