import mitt from "mitt";
import type { SOCKET_EVENT } from "~/constants/socket";
import type { SocketMessageData } from "~/types/base";
import type { Chat } from "~/types/chat";
import type { Order, OrderPaymentConfirmedType } from "~/types/order";

type SocketEvents = {
  [SOCKET_EVENT.NEW_CHAT_RECEIVED]: SocketMessageData<Chat>;
  [SOCKET_EVENT.ORDER_PAYMENT_CONFIRMED]: SocketMessageData<OrderPaymentConfirmedType>;
  [SOCKET_EVENT.ORDER_STATUS_UPDATED]: SocketMessageData<Order>;
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
