<template>
  <div>
    <div class="pointer-events-none absolute bottom-0 top-0 z-0">
      <img class="opacity-5" src="/img/chat-bg.jpeg" alt="" />
    </div>
    <div
      class="pointer-events-none absolute bottom-0 top-[50px] z-10 w-full overflow-auto pb-[60px]"
    >
      window.TelegramGameProxy.initParams: {{ initData }}
    </div>
    <button class="mt-3 bg-black p-2 text-white" @click="handleClick">
      open something
    </button>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "chat",
  title: "home",
  keepalive: true,
});
const initData = ref("");

const handleClick = () => {
  window.location.replace("/mini");
};

onMounted(() => {
  initData.value = JSON.stringify((window as any).TelegramGameProxy.initParams);
});
</script>
