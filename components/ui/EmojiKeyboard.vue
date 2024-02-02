<template>
  <EmojiPicker native disable-skin-tones display-recent @select="onSelect" />
</template>

<script setup lang="ts">
import EmojiPicker, { type EmojiExt } from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const emits = defineEmits<{
  (e: "select", emoji: EmojiExt): void;
}>();

function onSelect(emoji: EmojiExt) {
  emits("select", emoji);
}
</script>

<style scoped lang="css">
.v3-emoji-picker {
  width: 100%;
  border-radius: 0;
}
</style>
