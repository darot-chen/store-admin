<template>
  <div class="safe-area-padding-bottom mx-auto flex h-full max-w-lg flex-col">
    <div>
      <div
        class="sticky top-0 z-10 w-full max-w-lg bg-white py-[1.06rem]"
        style="max-width: 32rem; left: auto; z-index: 100"
      >
        <div class="flex w-full items-center justify-between gap-2 px-2">
          <div class="inline-flex items-center gap-2">
            <img
              src="/icons/chat-icon.svg"
              alt="chat-icon"
              class="h-[30px] w-[30px] rounded-full border border-[#E3E3E3] p-0.5"
            />
            <p class="line-clamp-1 font-bold">{{ authStore.user?.name }}</p>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex text-sm text-[#494E55]">
              <img src="/icons/star-wing.svg" alt="" />
              <img src="/icons/star-wing.svg" alt="" />
            </div>
            <div class="h-[30px] w-[30px] rounded-full bg-[#F5F8FE] p-0.5">
              <img src="/icons/customer-service.svg" alt="customer-service" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <main class="bg-red mt-5 flex h-full w-full flex-col">
      <slot />
    </main>
    <slot name="footer">
      <LayoutFooter />
    </slot>
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
