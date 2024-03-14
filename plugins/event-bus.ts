import mitt from "mitt";
import type { SOCKET_EVENT } from "~/constants/socket";
import type { SocketMessage } from "~/types/base";
import type { Chat } from "~/types/chat";
import type { Order, OrderPaymentConfirmedType } from "~/types/order";

type SocketEvents = {
  [SOCKET_EVENT.NEW_CHAT_RECEIVED]: SocketMessage<Chat>;
  [SOCKET_EVENT.ORDER_PAYMENT_CONFIRMED]: SocketMessage<OrderPaymentConfirmedType>;
  [SOCKET_EVENT.ORDER_STATUS_UPDATED]: SocketMessage<Order>;
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
