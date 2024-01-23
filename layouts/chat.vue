<template>
  <div
    class="safe-area-padding-bottom mx-auto mb-16 flex h-screen w-full max-w-lg flex-col"
  >
    <slot name="header">
      <div class="sticky top-0 z-10 w-full max-w-lg bg-white py-[1.06rem]">
        <div class="flex w-full items-center justify-between gap-2 px-2">
          <div class="basis-1/4">
            <button
              class="flex items-center gap-2 text-[#007AFF]"
              @click="navigateTo('/room')"
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
            {{ pageStore.title }}
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

    <main class="bg-app flex w-full max-w-lg flex-col">
      <slot />
    </main>

    <slot name="footer">
      <LayoutFooter />
    </slot>
  </div>
</template>

<script setup lang="ts">
import usePageStore from "~/stores/page";

const pageStore = usePageStore();

useHead({
  title: pageStore.title,
});
</script>

<style scoped lang="css">
.bg-app {
  display: block;
  overflow: auto;
  height: 100%;
  background: url("/img/chat-bg.png") no-repeat center center;
  background-size: cover;
  max-height: calc(100vh - 3.623rem);
}
</style>
