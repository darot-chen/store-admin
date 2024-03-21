<template>
  <div class="flex justify-between bg-[#F6F6F6] px-4 py-4">
    <button
      v-show="leftText"
      class="text-[17px] text-[#007AFF]"
      @click="$emit('leftTextClick')"
    >
      {{ leftText }}
    </button>
    <p class="grow text-center text-[17px] font-bold">{{ title }}</p>
    <button
      class="text-[17px] font-bold text-[#007AFF]"
      @click="$emit('rightTextClick')"
    >
      {{ rightText }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; leftText?: string; rightText?: string }>();

defineEmits<{
  (e: "leftTextClick"): void;
  (e: "rightTextClick"): void;
}>();
</script>

<style scoped></style>
