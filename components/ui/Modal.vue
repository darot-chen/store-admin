<template>
  <div v-show="show" class="popup-container max-w-lg">
    <div class="popup-content">
      <div>
        <div class="popup-header">
          <h3 class="text-[22px] font-semibold">{{ title }}</h3>
          <button class="absolute right-5 top-4">
            <Icon
              name="OutlineX"
              size="21"
              @click="() => $emit('update:show', false)"
            />
          </button>
        </div>
      </div>
      <div class="popup-body">
        <slot />
      </div>
      <div class="popup-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title?: string;
}>();

defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
  (e: "update:show", value: boolean): void;
}>();
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.popup-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16.96px 0;
  gap: 8.48px;
  background-color: #f2f5fc;
  border-bottom: 0.42px solid rgba(131, 139, 153, 0.25);
  border-radius: 13.57px 13.57px 0 0;
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 318px;
  background-color: white;
  border-radius: 13.57px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.popup-footer {
  background-color: #f2f5fc;
  padding: 10px 13.566px;

  border-radius: 0 0 13.57px 13.57px;
}
</style>
