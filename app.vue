<template>
  <NuxtLayout v-if="loading">
    <UiCircularLoading
      size="40"
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
    />
  </NuxtLayout>

  <NuxtLayout v-else>
    <NuxtPage :page-key="(route: any) => route.path" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { IsValidSocketEvent } from "~/constants/socket";
import { useAuthStore } from "./stores/auth";
import type { SocketMessage } from "./types/base";
import "./utils/extension";

const { setLocale, getLocaleCookie, setLocaleCookie } = useI18n();
const local = getLocaleCookie();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const loading = ref<boolean>(true);
const socketUrl = getWebSocketUrl();

const { open, close } = useSocket(socketUrl || "", {
  autoReconnect: true,
  reconnectTimeout: 0,
  onMessage(_, event) {
    handleOnMessage(event);
  },
});

const { $evEmit } = useNuxtApp();

function handleOnMessage(data: SocketMessage<any>) {
  if (!IsValidSocketEvent(data.event)) {
    // eslint-disable-next-line no-console
    console.error("unknown websocket event name");
    return;
  }

  $evEmit(data.event, data);
}

setLocaleCookie(local || "zh");
setLocale(local || "zh");

onMounted(async () => {
  const at = route.query.at?.toString();
  let token = null;

  if (at) {
    token = atob(at);
    storage.setAccessToken(token);
  } else {
    token = storage.getAccessToken();
  }

  if (token) {
    await authStore.getUser();
  }

  open(getWebSocketUrl());

  loading.value = false;

  await sleep(10);

  router.replace({
    query: {},
  });
});

onUnmounted(() => {
  close();
});
</script>
