<template>
  <NuxtLayout v-if="loading">
    <UiCircularLoading
      size="40"
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
    />
  </NuxtLayout>

  <NuxtLayout v-else>
    <UiNotification
      v-if="notificationStore.notifications.length"
      @click="onNotificationClick"
    />
    <NuxtPage :page-key="(route: any) => route.path" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { IsValidSocketEvent, SOCKET_EVENT } from "~/constants/socket";
import type { SocketMessageData } from "./types/base";
import "./utils/extension";

const { setLocale, getLocaleCookie, setLocaleCookie } = useI18n();
const local = getLocaleCookie();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();

const loading = ref<boolean>(true);
const socketUrl = getWebSocketUrl();
const { $evOn, $evOff } = useNuxtApp();

const { open, close } = useSocket(socketUrl || "", {
  autoReconnect: true,
  reconnectTimeout: 0,
  onMessage(_, event) {
    handleOnMessage(event);
  },
});

const { $evEmit } = useNuxtApp();

function handleOnMessage(data: SocketMessageData<any>) {
  if (!IsValidSocketEvent(data.event)) {
    // eslint-disable-next-line no-console
    console.error("unknown websocket event name");
    return;
  }

  $evEmit(data.event, data);
}

function onNotificationClick() {
  navigateTo(`/room/chat/${notificationStore.activeId}`);
}

setLocaleCookie(local || "zh");
setLocale(local || "zh");

onMounted(async () => {
  const at = route.query.at?.toString();
  let token = null;

  if (at) {
    token = atob(at);
    storage.setAccessToken(token);

    await sleep(10);
    router.replace(route.path);
  } else {
    token = storage.getAccessToken();
  }

  if (token) {
    await authStore.getUser();
  }

  open(getWebSocketUrl());

  $evOn(SOCKET_EVENT.NEW_CHAT_RECEIVED, (d) => {
    if (
      d.data.chat_room_id === +route.params.id ||
      authStore.user?.id === d.data.user_id
    )
      return;
    renderNotification(d.data);
  });

  loading.value = false;
});

onUnmounted(() => {
  $evOff(SOCKET_EVENT.NEW_CHAT_RECEIVED);
  close();
});
</script>
