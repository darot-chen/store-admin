<template>
  <div class="mx-auto flex h-full max-w-lg flex-col">
    <slot name="header">
      <LayoutChatHeader />
    </slot>
    <main
      class="no-scrollbar safe-area-padding-bottom mt-[50px] flex h-full w-full flex-col"
    >
      <slot />
    </main>
    <slot name="footer">
      <LayoutFooter />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { SocketMessageData } from "~/types/base";
import { SOCKET_EVENT } from "~/constants/socket";
import { Chat } from "~/types/chat";
const socketUrl = getWebSocketUrl();
const { open, close } = useSocket(socketUrl || "", {
  onMessage(_, event) {
    handleOnMessage(event);
  },
});
const { $evEmit, $evOff } = useNuxtApp();

onMounted(() => {
  open();
});

function handleOnMessage(data: SocketMessageData<unknown>) {
  switch (data.event) {
    case SOCKET_EVENT.NEW_CHAT_RECEIVED:
      $evEmit("new_chat_received", data.data as SocketMessageData<Chat>);
      break;
  }
}

onUnmounted(() => {
  $evOff("new_chat_received");
  close();
});
</script>
