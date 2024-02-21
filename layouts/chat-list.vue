<template>
  <div
    class="safe-area-padding-bottom mx-auto mb-16 flex h-screen w-full max-w-lg flex-col overflow-hidden"
  >
    <div name="header">
      <LayoutChatListHeader />
    </div>

    <main class="bg-app flex w-full max-w-lg flex-col">
      <slot />
    </main>

    <slot name="footer">
      <LayoutFooter />
    </slot>
  </div>
</template>

<script setup lang="ts">
const pageStore = usePageStore();

watch(
  () => pageStore.title,
  () => {
    useHead({
      title: pageStore.title,
    });
  }
);
</script>

<style scoped lang="css">
.bg-app {
  display: block;
  overflow: auto;
  height: 100%;
  background: url("/images/chat-bg.png") no-repeat center center;
  background-size: cover;
  max-height: calc(100vh - 3.623rem);
}
</style>
