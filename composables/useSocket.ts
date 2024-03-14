import type { SocketMessage } from "~/types/base";

type Options = {
  autoConnect?: boolean;
  autoReconnect?: boolean;
  maxRetries?: number;
  reconnectTimeout?: number;
  onMessage?: (ws: WebSocket, data: SocketMessage<unknown>) => void;
  onError?: (ws: WebSocket, error: Event) => void;
  onOpen?: (ws: WebSocket, ev: Event) => void;
  onClose?: (code: number, reason: string) => void;
};

type Websocket = {
  status: Ref<"connecting" | "open" | "closing" | "closed">;
  data: Ref<any>;
  send: (data: any) => void;
  open: (val?: string) => void;
  close: (code?: number, reason?: string) => void;
};

export function useSocket(
  url: string | Ref<string>,
  options: Options = {}
): Websocket {
  const socket = ref<WebSocket>();
  const status: Ref = ref<"connecting" | "open" | "closing" | "closed">(
    "connecting"
  );
  const data: Ref<any> = ref(null);
  const retryCount: Ref<number> = ref(0);
  const maxRetries: number = options.maxRetries || 9;
  const reconnectTimeout = options.reconnectTimeout || 5000;

  let Url = typeof url === "string" ? url : url.value;

  const connect = (urlVal?: string) => {
    socket.value = new WebSocket(urlVal || Url);
    const ws = socket.value;

    ws.onopen = (ev) => {
      options.onOpen?.(ws, ev);
      status.value = "open";
      retryCount.value = 0;
    };

    ws.onmessage = (event) => {
      data.value = event.data;
      options.onMessage?.(ws, JSON.parse(event.data));
    };

    ws.onerror = (error) => {
      options.onError?.(ws, error);
    };

    ws.onclose = (event) => {
      options?.onClose?.(event.code, event.reason);
      status.value = "closed";
      socket.value = undefined;

      const attempt = () => {
        if (retryCount.value < maxRetries) {
          retryCount.value++;
          reconnect();
        }
      };

      if (options.autoReconnect && retryCount.value < maxRetries) {
        status.value = "connecting";
        setTimeout(() => attempt(), reconnectTimeout);
      }
    };
  };

  if (!isSSR()) {
    const closeEvent = () => close();
    onMounted(() => {
      if (options?.autoConnect) open();
      window.addEventListener("beforeunload", closeEvent);
    });
    onUnmounted(() => window.removeEventListener("beforeunload", closeEvent));
  }

  const send = (data: any) => {
    if (socket.value) {
      socket.value.send(JSON.stringify(data));
    }
  };

  const open = (urlVal?: string) => {
    if (status?.value === "closed" || status?.value === "closing") {
      socket.value = undefined;
      status.value = "connecting";
    }

    connect(urlVal);
  };

  const close = (code?: number, reason?: string) => {
    if (status?.value === "open") {
      socket.value?.close(code, reason);
      status.value = "closing";
    }
  };

  const reconnect = () => {
    close();
    setTimeout(() => {
      open();
    }, 10);
  };

  if (typeof url === "object") {
    watch(
      url,
      (newUrl) => {
        if (newUrl !== Url) {
          Url = newUrl;
          reconnect();
        }
      },
      {
        immediate: true,
      }
    );
  }

  return {
    status,
    data,
    send,
    open,
    close,
  };
}
