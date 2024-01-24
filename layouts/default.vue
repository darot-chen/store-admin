<template>
  <div class="safe-area-padding-bottom mx-auto flex h-full max-w-lg flex-col">
    <div>
      <div
        class="sticky top-0 z-10 w-full max-w-lg bg-white py-[1.06rem]"
        style="max-width: 32rem; left: auto; z-index: 100"
      >
        <div class="px-2">
          <NuxtLink to="/" class="inline-flex items-center gap-2">
            <p class="line-clamp-1 font-bold">{{ authStore.user?.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <main class="app mt-2 flex flex-col">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const { t } = useI18n();
const route = useRoute();

useHead({
  title: t(route.meta.title || ""),
});
</script>

<style scoped lang="css">
.app {
  height: 100%;
  max-height: calc(100vh - 3.623rem);
  display: block;
  overflow: auto;
  height: 100%;
}
</style>
