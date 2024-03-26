<template>
  <div
    class="safe-area-padding-bottom mx-auto flex h-full max-w-lg flex-col bg-[#FFFFFFBF]"
  >
    <slot name="header">
      <LayoutHeaderChat v-if="route.path === '/room'" />
      <LayoutHeaderHome v-else-if="route.path === '/'" />
      <div v-else-if="route.path === '/account'" />
      <LayoutHeaderDefault v-else />
    </slot>

    <main class="bg-app flex w-full max-w-lg flex-col">
      <slot />
    </main>

    <slot name="footer">
      <LayoutFooter
        v-if="
          route.path === '/' ||
          route.path === '/account' ||
          route.path === '/room'
        "
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const pageStore = usePageStore();
const route = useRoute();

watch(
  () => pageStore.title,
  () => {
    if (route.path === "/room" || route.path === "/") {
      useHead({
        title: authStore.user?.name,
      });
    } else {
      useHead({
        title: pageStore.title,
      });
    }
  }
);
</script>

<style scoped lang="css">
.bg-app {
  display: block;
  overflow: auto;
  height: 100%;
  background-size: cover;
  background: #edeef0;
  max-height: calc(100vh - 3.623rem);
}
</style>
