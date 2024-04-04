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
import { loginViaMiniApp, saveLastSession } from "~/api/user";
import "./utils/extension";

const { setLocale, getLocaleCookie, setLocaleCookie } = useI18n();
const local = getLocaleCookie();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();
const isRedirect = ref<boolean>(true);

const loading = ref<boolean>(true);
const socketUrl = getWebSocketUrl();
const { $evOn, $evOff } = useNuxtApp();

const { open, close } = useSocket(socketUrl || "", {
  autoReconnect: true,
  reconnectTimeout: 0,
  onMessage(_, event) {
    onMessage(event);
  },
});

const { $evEmit } = useNuxtApp();

function onMessage(data: SocketMessageData<any>) {
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

watch(
  () => route.fullPath,
  (v) => {
    if (storage.getAccessToken()) {
      saveLastSession(v);
    }
  }
);

onMounted(async () => {
  const tg = (window as any).Telegram;
  const at = route.query.at?.toString();

  let token = null;

  if (tg?.WebApp && tg?.WebApp?.initData) {
    tg.WebApp?.enableClosingConfirmation();
    tg.WebApp?.expand();
    tg.WebApp?.MainButton?.show();
    tg.WebApp?.BackButton?.show();

    const res = await loginViaMiniApp(tg.WebApp?.initData);
    if (res) {
      token = res.token;
      storage.setAccessToken(token);

      await sleep(10);
      if (res?.start_action?.type === "join_room") {
        router.replace(`/room/chat/${res.start_action.data.room_id}`);
        isRedirect.value = false;
      } else if (res?.start_action?.type === "chatrooms") {
        router.replace(`/room`);
        isRedirect.value = false;
      } else if (res?.start_action?.type === "mine") {
        router.replace(`/account`);
        isRedirect.value = false;
      } else {
        router.replace(route.path);
      }
    }
  }

  if (!token && at) {
    token = atob(at);
    storage.setAccessToken(token);

    await sleep(10);
    router.replace(route.path);
  } else {
    token = storage.getAccessToken();
  }

  if (token) {
    await authStore.getUser();
    if (
      authStore.user?.last_viewed_page &&
      authStore.user?.last_viewed_page !== "/" &&
      route.fullPath !== authStore.user?.last_viewed_page &&
      isRedirect.value
    ) {
      await router.replace(authStore.user?.last_viewed_page);
    }
  }

  open(getWebSocketUrl());

  $evOn(SOCKET_EVENT.NEW_CHAT_RECEIVED, (d) => {
    if (
      d.data.chat_room_id === +route.params.id ||
      authStore.user?.id === d.data.user_id
    ) {
      return;
    }

    renderNotification(d.data);
  });

  loading.value = false;
});

onBeforeMount(() => {
  $evOff(SOCKET_EVENT.NEW_CHAT_RECEIVED);
});

onUnmounted(() => {
  close();
});
</script>
