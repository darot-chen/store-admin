<template>
  <div v-if="loading" class="flex h-screen items-center justify-center">
    <div
      class="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"
    />
  </div>
  <NuxtLayout v-else>
    <NuxtPage
      :page-key="(route: any) => route.path"
      :keepalive="$route.meta.keepalive"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import useUserStore from "./stores/userStore";

const { setLocale, getLocaleCookie, setLocaleCookie } = useI18n();
const local = getLocaleCookie();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(true);

onMounted(() => {
  const at = route.query.at?.toString();
  let token: string | null | undefined;
  if (at) {
    loading.value = true;
    token = atob(at);
    setToken(token);
  } else {
    token = getToken();
  }
  setTimeout(async () => {
    if (token) {
      await userStore.me();
    }

    router.replace({
      query: {},
    });
  }, 1000);
  loading.value = false;
});

setLocaleCookie(local || "zh");
setLocale(local || "zh");
</script>
