<template>
  <div class="flex-col gap-[4.24px]">
    <div class="popup-footer">
      <textarea
        placeholder="请输入（选修的）"
        class="popup-footer-input h-[60px] w-full rounded-[7px] p-[8px] text-[8px] leading-[13px]"
      />
      <button class="button-submit" @click="$emit('click')">
        <p>{{ $t("submit") }}</p>
      </button>
    </div>
    <p class="error-validation">*为了提供更佳服务,请对商家做出评价！</p>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "click"): void;
}>();
</script>

<style scoped>
.popup-footer {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
}

.popup-footer-input {
  display: flex;
  width: 204px;
  resize: none;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 7px;
  border: 0.5px solid rgba(120, 122, 141, 0.25);
  background: #fff;
}

.button-submit {
  align-items: center;
  align-self: stretch;
  border-radius: 7px;
  color: #fff;
  width: 76px;
  background: #50a7ea;
}

.button-submit p {
  color: #fff;
  font-size: 13.566px;
  font-weight: 600;
  line-height: 12.718px;
  white-space: nowrap;
}

.error-validation {
  color: #f57f7f;
  font-size: 8px;
  line-height: 13px;
}
</style>
