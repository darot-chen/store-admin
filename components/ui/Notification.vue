<template>
  <Transition name="slide" appear>
    <button
      v-if="notification !== null"
      v-show="notification.show"
      class="notification fixed top-0 z-[100] mt-2 flex max-h-36 w-full max-w-lg rounded-md p-4 drop-shadow-lg"
      @click="onClick"
    >
      <div class="top-2 flex w-full items-center gap-2 drop-shadow-lg">
        <div>
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#4193E2]"
          >
            <Icon
              v-if="notification?.icon"
              :name="notification.icon"
              size="20"
              color="#fff"
            />
          </div>
        </div>
        <div class="flex flex-col items-start">
          <p class="notification-title line-clamp-1">
            {{ notification?.title || "" }}
          </p>
          <p
            class="notification-message line-clamp-3 break-all text-[#000000BF]"
          >
            {{ notification?.message || "" }}
          </p>
        </div>
      </div>
      <button class="absolute right-5" @click.stop="onClose">
        <Icon name="X" size="20" color="#0f0f0f" />
      </button>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import type { AppNotification } from "~/types/common";

const emit = defineEmits<{
  (e: "click"): void;
}>();

const notificationStore = useNotificationStore();
const notification = ref<AppNotification | null>(
  notificationStore.notifications[0]
);

function onClick() {
  onClose();
  emit("click");
}

async function onClose() {
  if (!notification.value) return;
  notificationStore.removeNotification(notification.value.id);
  notification.value = null;
  await sleep(300);
  if (notificationStore.notifications.length > 0) {
    notification.value = notificationStore.notifications[0];
  }
}

watch(
  notification,
  () => {
    const { isPending, start, stop } = useTimeoutFn(() => {
      onClose();
    }, notification.value?.duration || 5000);

    if (isPending.value) {
      start();
    } else {
      stop();
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

.notification {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.notification-title {
  font-size: 16px;
  font-weight: 700;
}

.notification-message {
  font-size: 14px;
  font-weight: 400;
}
</style>
