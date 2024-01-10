<template>
  <div>
    <div class="absolute bottom-0 top-0 z-0">
      <img class="opacity-5" src="/img/chat-bg.jpeg" alt="" />
    </div>
    <div
      class="absolute bottom-0 top-[50px] z-10 w-full overflow-auto pb-[60px]"
    >
      window.TelegramGameProxy.initParams: {{ initData }}
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "chat",
  title: "home",
  keepalive: true,
});
const initData = ref("");

onMounted(() => {
  initData.value = JSON.stringify((window as any).TelegramGameProxy.initParams);
});
</script>
