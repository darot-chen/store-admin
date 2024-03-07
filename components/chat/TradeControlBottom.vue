<template>
  <div class="flex w-full items-center justify-between">
    <div class="flex items-center">
      <div class="flex flex-col">
        <div class="flex flex-row items-center">
          <p class="label">费率</p>
          <Icon name="Info" size="10" color="#B7B7B7" class="ml-1" />
        </div>
        <p>{{ detail?.business?.commission || 0 }}%</p>
      </div>
      <UiDivider
        orientation="vertical"
        class="mx-5 h-6"
        size="2xs"
        style="background-color: #b7b7b7"
      />
      <div class="flex flex-col">
        <div class="flex flex-row items-center">
          <p class="label">固定汇率</p>
          <Icon name="Info" size="10" color="#B7B7B7" class="ml-1" />
        </div>
        <p>{{ detail?.order?.exchange_rate || 0 }}</p>
      </div>
      <UiDivider
        orientation="vertical"
        class="mx-5 h-6"
        size="2xs"
        style="background-color: #b7b7b7"
      />
      <div class="flex flex-col">
        <div class="flex flex-row items-center">
          <p class="label">净余担保金额</p>
          <Icon name="Info" size="10" color="#B7B7B7" class="ml-1" />
        </div>
        <p>510,000U</p>
      </div>
    </div>
    <div class="mb-2 mr-2 flex">
      <button class="arrow" @click="$emit('click')">
        <Icon
          :class="[isVisible ? 'arrow-up' : 'arrow-down', 'opacity-30']"
          name="Caret"
          color="#3C3C43"
          size="11"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatDetail } from "~/types/chat";

defineProps<{
  detail: ChatDetail | undefined;
  isVisible: boolean;
}>();

defineEmits(["click"]);
</script>

<style scoped>
.label {
  color: #b7b7b7;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.value {
  color: #212121;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.arrow {
  width: 0.43369rem;
  height: 0.74394rem;
}

.arrow-up {
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);
}

.arrow-down {
  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
}
</style>
