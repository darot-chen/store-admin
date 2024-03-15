<template>
  <div v-if="show" ref="modal" class="relative w-[90%] max-w-md">
    <button
      v-if="loading"
      class="absolute right-2 top-1 z-50"
      @click="$emit('update:show', false)"
    >
      <Icon name="X" color="#fff" size="20" />
    </button>
    <div v-bind="$attrs">
      <Cropper
        ref="cropperRef"
        :src="src"
        :stencil-component="CircleStencil"
        @ready="() => (loading = true)"
      />
      <VanButton
        v-if="loading"
        :loading="isLoading"
        type="primary"
        class="w-full"
        @click="onConfirm"
      >
        {{ $t("upload") }}
      </VanButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleStencil, Cropper } from "vue-advanced-cropper";

const cropperRef = ref(null);
const modal = ref(null);
const loading = ref(false);

defineProps<{
  src: string;
  show: boolean;
  isLoading: boolean;
}>();

useClickAway(modal, () => {
  emit("update:show", false);
});

const emit = defineEmits<{
  (e: "cropImage", cropperRef: Ref): void;
  (e: "update:src", src: string): void;
  (e: "update:show", show: boolean): void;
}>();

const onConfirm = () => {
  emit("cropImage", cropperRef);
};

onUnmounted(() => {
  cropperRef.value = null;
  emit("update:src", "");
});
</script>
