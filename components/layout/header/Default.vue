<template>
  <div class="sticky top-0 z-10 w-full max-w-lg py-[1.06rem]">
    <div class="flex w-full items-center justify-between gap-2 px-2">
      <div class="basis-1/4">
        <button
          v-if="$route.path !== '/account' && $route.path !== '/'"
          class="flex items-center gap-2 text-[#007AFF]"
          @click="$router.back()"
        >
          <Icon name="Caret" color="#007AFF" size="15" class="rotate-90" />
          <p>{{ $t("back") }}</p>
        </button>
      </div>

      <div class="inline-flex items-center gap-2">
        <p class="line-clamp-1 font-bold">
          {{
            $route.path === "/room" || $route.path === "/"
              ? authStore.user?.name
              : pageStore.title
          }}
        </p>
      </div>
      <div class="basis-1/4" />
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const pageStore = usePageStore();
</script>
