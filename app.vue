<template>
  <NuxtLayout>
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
const firstLoad = ref<boolean>(false);
const route = useRoute();
const router = useRouter();

onMounted(() => {
  firstLoad.value = true;
  const at = route.query.at?.toString();
  let token: string | null | undefined;
  if (at) {
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
});

setLocaleCookie(local || "zh");
setLocale(local || "zh");
</script>
