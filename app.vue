<template>
  <NuxtLayout v-if="loading">
    <div class="flex h-screen items-center justify-center">
      <div
        class="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500"
      />
    </div>
  </NuxtLayout>

  <NuxtLayout v-else>
    <NuxtPage
      :page-key="(route: any) => route.path"
      :keepalive="$route.meta.keepalive"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SOCKET_EVENT } from "~/constants/socket";
import { useAuthStore } from "./stores/auth";
import type { SocketMessageData } from "./types/base";
import type { Chat } from "./types/chat";

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

function handleOnMessage(data: SocketMessageData<unknown>) {
  switch (data.event) {
    case SOCKET_EVENT.NEW_CHAT_RECEIVED:
      $evEmit("new_chat_received", data.data as SocketMessageData<Chat>);
      break;
  }
}

setLocaleCookie(local || "zh");
setLocale(local || "zh");

onMounted(async () => {
  loading.value = true;
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

  // router.replace({
  //   query: {},
  // });

  loading.value = false;
});

onUnmounted(() => {
  close();
});
</script>
