<template>
  <div
    class="safe-area-padding-bottom mx-auto flex h-full max-w-lg flex-col bg-[#FFFFFFBF]"
  >
    <UiNotification
      v-if="notificationStore.notifications.length"
      @click="onNotificationClick"
    />
    <slot name="header">
      <LayoutChatListHeader v-if="route.path === '/room'" />

      <div v-else-if="route.path === '/account'" />

      <div v-else class="sticky top-0 z-10 w-full max-w-lg py-[1.06rem]">
        <div class="flex w-full items-center justify-between gap-2 px-2">
          <div class="basis-1/4">
            <button
              v-if="route.path !== '/account' && route.path !== '/'"
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
    </slot>

    <main class="bg-app flex w-full max-w-lg flex-col">
      <slot />
    </main>

    <slot name="footer">
      <LayoutFooter
        v-if="
          route.path === '/' ||
          route.path === '/account' ||
          route.path === '/room'
        "
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { SOCKET_EVENT } from "~/constants/socket";
import { ChatType, type Chat } from "~/types/chat";

const authStore = useAuthStore();
const pageStore = usePageStore();
const route = useRoute();
const notificationStore = useNotificationStore();
const { $evOn, $evOff } = useNuxtApp();
const chatId = ref<number | null>(null);
const { t } = useI18n();

watch(
  () => pageStore.title,
  () => {
    if (route.path === "/room" || route.path === "/") {
      useHead({
        title: authStore.user?.name,
      });
    } else {
      useHead({
        title: pageStore.title,
      });
    }
  }
);

function onNotificationClick() {
  if (chatId.value) {
    navigateTo(`/room/chat/${chatId.value}`);
  }
}

function renderNotification(m: Chat) {
  if (m.type === ChatType.Text) {
    notificationStore.addNotification({
      title: m.user?.name || "",
      message: m?.message || "",
      icon: "Chat",
      duration: 10000,
    });
    chatId.value = m.chat_room_id;
  } else if (m.type === ChatType.Image || m.type === ChatType.Video) {
    notificationStore.addNotification({
      title: m.user?.name || "",
      message: t("send_an_attachment"),
      icon: "tabler:photo",
      duration: 10000,
    });
    chatId.value = m.chat_room_id;
  } else if (m.type === ChatType.Action) {
    notificationStore.addNotification({
      title: m.user?.name || "",
      message: getChatEvent(m.message, m.user?.name),
      icon: getChatEventIcon(m.message),
      duration: 10000,
    });
    chatId.value = m.chat_room_id;
  }
}

onMounted(() => {
  $evOn(SOCKET_EVENT.NEW_CHAT_RECEIVED, (d) => {
    renderNotification(d.data);
  });
});

onBeforeUnmount(() => {
  $evOff(SOCKET_EVENT.NEW_CHAT_RECEIVED);
});
</script>

<style scoped lang="css">
.bg-app {
  display: block;
  overflow: auto;
  height: 100%;
  background-size: cover;
  background: #edeef0;
  max-height: calc(100vh - 3.623rem);
}
</style>
