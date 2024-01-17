<template>
  <div class="mx-auto mb-16 flex h-full w-full max-w-lg flex-col">
    <slot name="header">
      <div class="fixed z-10 w-full max-w-lg bg-white py-[1.06rem]">
        <div class="flex w-full items-center justify-between gap-2 px-2">
          <div class="basis-1/4">
            <button
              class="flex items-center gap-2 text-[#007AFF]"
              @click="$router.back()"
            >
              <img
                class="h-[1.125rem] w-[0.5625rem]"
                src="/icons/blue-arrow-left.svg"
                alt="back"
              />
              <p>Back</p>
            </button>
          </div>

          <p class="line-clamp-1 max-w-[50%] basis-2/4 text-center">
            {{ t(route.meta.title || "") }}
          </p>

          <div class="inline-flex basis-1/4 justify-end">
            <button>
              <img
                src="/icons/blue-phone.svg"
                class="w-[1.5rem]"
                alt="customer-service"
              />
            </button>
          </div>
        </div>
      </div>
    </slot>

    <main
      class="bg-app mt-[3.619rem] flex h-full w-full max-w-lg flex-col"
      data-scroll
    >
      <slot />
    </main>

    <slot name="footer">
      <LayoutFooter />
    </slot>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

useHead({
  title: t(route.meta.title || ""),
});
</script>

<style scoped lang="css">
.bg-app {
  display: block;
  overflow: auto;
  height: 100%;
  background: url("/img/chat-bg.png") no-repeat center center;
  background-size: cover;
}
</style>
