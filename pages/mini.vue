<template>
  <div class="h-full"><input :value=" initData "/></div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "mobile",
  title: "home",
  keepalive: true,
});
const initData = ref<string>("");
onMounted(() => {
  initData.value = (window as any).Telegram.WebApp.initData;
});
</script>
