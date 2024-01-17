<template>
  <Suspense v-if="loading" />
  <NuxtLayout v-else>
    <NuxtPage
      v-if="!loading"
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
const loading = ref<boolean>(false);

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
  setTimeout(() => {
    if (token) {
      userStore.me();
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
