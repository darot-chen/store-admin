import mitt from "mitt";
import type { SocketMessageData } from "~/types/base";
import type { Chat } from "~/types/chat";
import type { Order, OrderPaymentConfirmedType } from "~/types/order";

type SocketEvents = {
  new_chat_received: SocketMessageData<Chat>;
  order_payment_confirmed: SocketMessageData<OrderPaymentConfirmedType>;
  order_status_updated: SocketMessageData<Order>;
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
