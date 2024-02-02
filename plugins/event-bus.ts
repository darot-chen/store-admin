import mitt from "mitt";
import type { SocketMessageData } from "~/types/base";
import type { Chat } from "~/types/chat";

type SocketEvents = {
  new_chat_received: SocketMessageData<Chat>;
};

export default defineNuxtPlugin(() => {
  const emitter = mitt<SocketEvents>();

  return {
    provide: {
      evEmit: emitter.emit,
      evOn: emitter.on,
      evOff: emitter.off,
    },
  };
});
