<template>
  <div class="safe-area-padding-bottom mx-auto flex h-full max-w-lg flex-col">
    <slot name="header">
      <div class="sticky top-0 z-10 w-full max-w-lg bg-white py-[1.06rem]">
        <div class="flex justify-center px-2">
          <div class="inline-flex items-center gap-2">
            <p class="line-clamp-1 font-bold">
              {{
                $route.path === "/room" || $route.path === "/"
                  ? authStore.user?.name
                  : pageStore.title
              }}
            </p>
          </div>
        </div>
      </div>
    </slot>

    <main class="bg-app flex w-full max-w-lg flex-col">
      <slot />
    </main>
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
