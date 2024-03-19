<template>
  <div v-if="!loading" class="flex h-full flex-col">
    <div class="sticky top-0 z-10 w-full">
      <ChatTradeControl
        v-if="showTradeControl"
        :lobby-title="title"
        :detail="chatDetail"
        :new-order-detail="newOrderDetail"
        :show-confirm-button="showConfirmOrder"
        @order="onOrderClick"
        @confirm-order-payment="onConfirmPayment"
        @confirm-order="onConfirmOrder"
        @request-support="onRequestSupport"
      />
    </div>
    <div
      id="chat-container"
      class="mx-1 flex flex-grow flex-col gap-[1rem] overflow-scroll pt-2"
      @scroll="onScroll"
    >
      <UiCircularLoading
        v-show="fetchingMoreChat"
        class="flex justify-center"
      />
      <UiChatBubble
        v-for="c in chats"
        :id="'chat_' + c.id"
        :key="c.id"
        :name="!c.user_id ? c.admin?.name ?? '' : c.user?.name ?? ''"
        :text="c.message"
        :timestamp="c.created_at"
        :show-profile="true"
        :type="c.type"
        :show-button="
          !!showConfirmOrder &&
          c.message === CHAT_ACTIONS.NEW_ORDER_CREATED &&
          c.order?.id === chatDetail?.order?.id
        "
        :order="c.order"
        :chat-type="c.user_id === authStore.user?.id ? 'outgoing' : 'incoming'"
        :detail="c.type === ChatType.Action ? chatDetail : undefined"
        :is-selected="c.id.toString() === msgId"
        :profile="c.user?.profile_key"
        :chat="c"
        @confirm="onConfirmOrder"
        @reject="onRejectOrder"
        @reply="onReply(c.id)"
        @on-header-reply-click="onHeaderReplyClick"
      />

      <UiCircularLoading
        v-show="fetchingMoreLowerChat"
        class="flex justify-center"
      />
      <div ref="bottomEl" />
    </div>
    <button
      v-show="showScrollButton"
      class="fixed right-5 rounded-full bg-blue-500 p-2 text-white shadow-lg"
      :class="replyMsgId ? 'bottom-32' : 'bottom-16'"
      @click="onScrollToBottom"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
    <div class="sticky bottom-0 w-full">
      <div v-if="replyMsgId" class="bg-white py-2">
        <ChatReply
          :chat="chats.find((c) => c.id === replyMsgId)"
          :replying="true"
          @cancel="onCancelReply"
        />
      </div>
      <ChatInput
        v-if="hasJoined"
        v-model="messagePayload.message"
        :loading="isUploading"
        @submit="onSubmit"
        @attach-file="onAttachFile"
      />
      <div
        v-else-if="chatDetail?.type === ChatRoomType.PUBLIC"
        class="relative flex h-full flex-col px-5 pb-4"
      >
        <div class="flex h-full flex-col items-center justify-end">
          <button
            class="w-full rounded-full bg-[#50a7ea] p-[0.7rem] text-white shadow-xl"
            @click="onJoinChat"
          >
            {{ $t("join_chat") }}
          </button>
        </div>
      </div>
    </div>
    <UiPopupConfirmation
      v-model:show="showConfirmationPopup"
      title="交易成功"
      type="success"
    >
      <ChatConfirmationBody
        v-if="prevDetail && prevDetail?.order"
        v-model:score="rateScore"
        :data="prevDetail"
      />
      <template #footer>
        <ChatConfirmationFooter
          v-model:comment="rateComment"
          @submit="onRateSeller"
        />
      </template>
    </UiPopupConfirmation>
  </div>
  <UiCircularLoading
    v-else
    class="fixed left-0 top-0 flex h-full w-full items-center justify-center"
    size="40"
  />
</template>

<script setup lang="ts">
import { showDialog, showFailToast, showSuccessToast } from "vant";
import {
  addChat,
  getChat,
  getChatDetail,
  joinPublicChatRoom,
  requestSupport,
  uploadImage,
  uploadVideo,
  getChatMessageById,
} from "~/api/chat";
import {
  buyerRejectOrder,
  completeOrder,
  confirmOrder,
  rateSeller,
} from "~/api/order";
import { CHAT_ACTIONS } from "~/constants/chat-actions";
import { SOCKET_EVENT } from "~/constants/socket";
import { ChatType, type Chat, type ChatDetail } from "~/types/chat";
import { ChatRoomType } from "~/types/chatRoom";
import { OrderStatus, type OrderDetail } from "~/types/order";

const { $evOn, $evOff } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const pageStore = usePageStore();

const roomID = +route.params.id;
let msgId = route.query.msgId;

const title = ref<string>("");
const bottomEl = ref<HTMLDivElement | null>(null);
const loading = ref<boolean>(false);
const chats = ref<Chat[]>([]);
const hasJoined = ref<boolean>(false);
const lastItemId = ref<number>(0);
const replyMsgId = ref<number | undefined>(undefined);
const hasMore = ref<boolean>(false);
const firstLoad = ref<boolean>(true);
const fetchingMoreChat = ref<boolean>(false);
const fetchingMoreLowerChat = ref<boolean>(false);
const showScrollButton = ref<boolean>(false);
const chatDetail = ref<ChatDetail>();
const isUploading = ref<boolean>(false);
const showConfirmationPopup = ref<boolean>(false);
const prevDetail = ref<ChatDetail>();
const newOrderDetail = ref<OrderDetail>();
const rateScore = ref<number>(0);
const rateComment = ref<string>("");
const orderID = ref<number | undefined>();
const { t } = useI18n();

const upperCursor = ref<number>();
const isUpperChatHasNext = ref<boolean>();
const lowerCursor = ref<number>();
const isLowerChatHasNext = ref<boolean>();

const showConfirmOrder = computed(() => {
  return (
    chatDetail.value?.order &&
    chatDetail.value?.order?.buyer_id === authStore.user?.id &&
    chatDetail.value?.order?.status === OrderStatus.CONFIRMING &&
    chatDetail.value.order?.buyer_confirmed_at === null
  );
});

const showTradeControl = computed(() => {
  return chatDetail.value?.type === ChatRoomType.PRIVATE;
});

const messagePayload = ref<{
  type: "text";
  message: string;
}>({
  type: "text",
  message: "",
});

onMounted(() => {
  init();

  $evOn(SOCKET_EVENT.NEW_CHAT_RECEIVED, async (d: any) => {
    if (d.data.chat_room_id !== roomID) return;

    if (d.data.type === ChatType.Action) {
      chatDetail.value = await getChatDetail(roomID);
      if (chatDetail.value.order?.id) {
        orderID.value = chatDetail.value.order?.id;
      }
    }

    if (
      d.data.type === ChatType.Action &&
      d.data.message === CHAT_ACTIONS.NEW_TICKET_CREATED
    ) {
      chatDetail.value = d.data?.order && d.data.order;
    }

    if (d.data.message === CHAT_ACTIONS.ORDER_UPDATED) {
      chatDetail.value = d.data?.order && d.data.order;
    }

    addChatAndSort(d.data);
  });

  $evOn(SOCKET_EVENT.ORDER_STATUS_UPDATED, (d: any) => {
    if (d.data?.id !== chatDetail.value?.order?.id) return;

    if (
      d.data?.status === OrderStatus.SUCCESS &&
      d.data?.seller_completed_at &&
      d.data?.buyer_completed_at &&
      prevDetail.value?.order?.buyer_id === authStore.user?.id
    ) {
      if (prevDetail.value?.order) {
        prevDetail.value.order.buyer_completed_at = d.data?.buyer_completed_at;
        prevDetail.value.order.seller_completed_at =
          d.data?.seller_completed_at;
        prevDetail.value.order.status = d.data?.status;
      }

      showConfirmationPopup.value = true;
    }
  });

  $evOn(SOCKET_EVENT.ORDER_PAYMENT_CONFIRMED, (d) => {
    if (d.data?.order?.id !== chatDetail.value?.order?.id) return;

    if (chatDetail.value && chatDetail.value.order) {
      chatDetail.value.order.amount_paid = d.data?.order?.amount_paid || 0;
      chatDetail.value.order.quantity_given =
        d.data?.order?.quantity_given || 0;
      chatDetail.value.order.buyer_confirmed_at =
        d.data?.order?.buyer_confirmed_at;
      chatDetail.value.order.seller_confirmed_at =
        d.data?.order?.seller_confirmed_at;
    }

    const payment = d.data?.orderPayment;
    if (!payment) return;
    newOrderDetail.value = payment;

    if (payment.amount_paid) {
      onCountPayment("seller");
    } else if (payment.quantity_given) {
      onCountPayment("buyer");
    }
  });
});

onBeforeUnmount(() => {
  pageStore.$reset();
  $evOff(SOCKET_EVENT.NEW_CHAT_RECEIVED);
  $evOff(SOCKET_EVENT.ORDER_PAYMENT_CONFIRMED);
  $evOff(SOCKET_EVENT.ORDER_STATUS_UPDATED);
});

definePageMeta({
  layout: "chat",
});

function onCountPayment(type: "buyer" | "seller") {
  if (type === "buyer") {
    if (chatDetail.value && chatDetail.value.order) {
      chatDetail.value.order.total_buyer_payments += 1;
    }
  } else if (type === "seller") {
    if (chatDetail.value && chatDetail.value.order) {
      chatDetail.value.order.total_seller_payments += 1;
    }
  }
}

function onHeaderReplyClick(id: number) {
  const chatElement = document.getElementById(
    `chat_${id}`
  ) as HTMLElement | null;

  if (!chatElement) {
    msgId = id.toString();
    onFetchChatWithMSGId(id.toString());
    return;
  }
  chatElement?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function onRequestSupport() {
  showDialog({
    title: t("report"),
    message: t("are_you_sure_to_report_this_order"),
  }).then(async () => {
    if (!chatDetail.value?.order) return;

    try {
      await requestSupport(roomID, chatDetail.value?.order?.id);
      showSuccessToast(t("report_success"));
    } catch (error: any) {
      showFailToast(error?.message);
    }
  });
}

async function onRejectOrder() {
  if (!chatDetail.value?.order) return;

  try {
    await buyerRejectOrder(chatDetail.value.order.id);
    showDialog({
      title: t("successfully_sent"),
      message: t("order_rejected_message"),
    }).then(() => {
      lastItemId.value = 0;
    });
  } catch (error: any) {
    showFailToast(error?.message);
  }
}

async function onConfirmOrder() {
  if (!chatDetail.value?.order) return;

  try {
    await confirmOrder(chatDetail.value.order.id);
    showDialog({
      title: t("successfully_sent"),
      message: t("order_confirmed_message"),
    }).then(() => {
      lastItemId.value = 0;
    });
  } catch (error: any) {
    showFailToast(error?.message);
  }
}

function onReply(id: number) {
  replyMsgId.value = id;
}

function onCancelReply() {
  replyMsgId.value = undefined;
}

function onOrderClick() {
  const isRevisable =
    chatDetail.value?.order?.status === OrderStatus.REJECTED ||
    chatDetail.value?.order?.status === OrderStatus.CONFIRMING;

  const path = `order/${roomID}`;

  if (isRevisable) {
    router.push({
      path,
      query: {
        revisable: "true",
      },
    });
  } else {
    router.push(path);
  }
}

async function init() {
  loading.value = true;

  if (typeof msgId === "string") {
    onFetchChatWithMSGId(msgId);
  } else {
    await fetchChats();
  }
  loading.value = false;
}

async function onFetchChatWithMSGId(id: string) {
  const searchChat = await getChatMessageById(id);

  if (!searchChat) return;

  const [descChats, ascChat] = await Promise.all([
    fetchChatWithParam("desc", searchChat.id),
    fetchChatWithParam("asc", searchChat.id),
  ]);

  upperCursor.value = descChats.results[descChats.results.length - 1]?.id;
  isUpperChatHasNext.value = descChats.meta.has_next;
  lowerCursor.value = ascChat.results[ascChat.results.length - 1]?.id;
  isLowerChatHasNext.value = ascChat.meta.has_next;

  const chatResult = [
    ...[searchChat],
    ...descChats.results,
    ...ascChat.results,
  ];

  const detail = await getChatDetail(roomID);

  hasJoined.value = detail.is_a_member ?? false;
  chatDetail.value = detail ?? undefined;
  title.value = detail?.business?.title ?? "";
  if (detail?.lobby_no) {
    title.value = `${title.value} ${t("lobby_no")} ${detail.lobby_no}`;
  }
  pageStore.setTitle(title.value ?? "");

  const sortedChatResult = chatResult.sort((a, b) => a.id - b.id);

  chats.value = sortedChatResult;

  await sleep(100);

  const chatElement = document.getElementById(
    `chat_${msgId}`
  ) as HTMLElement | null;

  if (chatElement) {
    chatElement?.scrollIntoView({ behavior: "instant", block: "center" });
  }
}

async function onConfirmPayment() {
  if (!chatDetail.value?.order) return;

  try {
    prevDetail.value = chatDetail.value;
    await completeOrder(chatDetail.value.order.id);
    lastItemId.value = 0;
  } catch (error: any) {
    showFailToast(error?.message);
  }
}

async function onAttachFile(file: File) {
  isUploading.value = true;

  scrollToBottom();

  try {
    if (file.type === "video/mp4") {
      if (file.size > 20 * 1024 * 1024) {
        throw new Error(
          t("attach_file_must_be_smaller_than", {
            value: "10",
          })
        );
      }

      await uploadVideo(roomID, file);
    } else {
      if (file.size > 10 * 1024 * 1024) {
        throw new Error(
          t("attach_file_must_be_smaller_than", {
            value: "10",
          })
        );
      }

      await uploadImage(roomID, file);
    }
  } catch (e: any) {
    showFailToast(e?.message);
  } finally {
    isUploading.value = false;
  }
}

async function onJoinChat() {
  await joinPublicChatRoom(roomID);
  fetchChats();
}

async function fetchChats() {
  const detail = await getChatDetail(roomID);

  hasJoined.value = detail.is_a_member ?? false;
  chatDetail.value = detail ?? undefined;
  title.value = detail?.business?.title ?? "";
  if (detail?.lobby_no) {
    title.value = `${title.value} ${t("lobby_no")} ${detail.lobby_no}`;
  }
  pageStore.setTitle(title.value ?? "");

  const chatRes = await getChat(roomID, {
    last: lastItemId.value,
    limit: 15,
  });

  if (chatRes.results?.length) {
    chats.value = chatRes.results.reverse();

    if (chatRes.meta.has_next) {
      lastItemId.value = chatRes.results[0].id;
      hasMore.value = chatRes.meta.has_next;
    }
  }

  sleepScrollToBottom();
}

async function sleepScrollToBottom() {
  await sleep(20);
  scrollToBottom();
}

async function onScrollToBottom() {
  if (bottomEl.value) {
    if (msgId) {
      lastItemId.value = 0;
      hasMore.value = false;
      chats.value.length = 0;
      upperCursor.value = 0;
      isUpperChatHasNext.value = false;
      lowerCursor.value = 0;
      isLowerChatHasNext.value = false;
      msgId = null;
      await fetchChats();
    }
    bottomEl.value.scrollIntoView();
  }
}

function scrollToBottom() {
  if (bottomEl.value) {
    if (firstLoad.value) {
      bottomEl.value.scrollIntoView();
      firstLoad.value = false;
    } else {
      bottomEl.value.scrollIntoView();
    }
  }
}

function addChatAndSort(newChat: Chat) {
  chats.value = [newChat, ...chats.value];
  chats.value = chats.value.sort((a, b) => {
    return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
  });

  sleepScrollToBottom();
}
async function fetchChatWithParam(
  orderBy?: "asc" | "desc",
  cursor?: number,
  limit?: number
) {
  const result = await getChat(roomID, {
    last: cursor ?? lastItemId.value,
    limit: limit ?? 15,
    order_by: orderBy,
  });

  return result;
}

const onScroll = useDebounceFn(async (e: Event) => {
  const target = e.target as HTMLDivElement;
  const scrollTop = target?.scrollTop;
  const prevScrollHeight = target.scrollHeight ?? 0;
  const prevScrollTop = target.scrollTop ?? 0;
  const clientHeight = target.clientHeight ?? 0;

  const atTop = scrollTop === 0;

  const atBottom =
    scrollTop + clientHeight >= prevScrollHeight - clientHeight * 0.2;

  const atBottomForScrollBottom =
    scrollTop + clientHeight >= prevScrollHeight - 20;
  showScrollButton.value = !atBottomForScrollBottom;

  function scrollAnimatedFrame() {
    const scrollHeight = target.scrollHeight ?? 0;
    if (scrollHeight) {
      requestAnimationFrame(async () => {
        await nextTick(() => {
          target.scrollTop = scrollHeight - prevScrollHeight + prevScrollTop;
          target.style.overflow = "hidden";
          requestAnimationFrame(() => {
            target.style.overflow = "scroll";
          });
        });
      });
    }
  }

  if (atTop) {
    if (msgId) {
      if (!isUpperChatHasNext.value && !fetchingMoreChat.value) return;

      await fetchChatWithId();
      scrollAnimatedFrame();
      return;
    }

    await fetchMoreChats();
    scrollAnimatedFrame();
  }

  if (atBottom) {
    if (!msgId) return;
    if (!isLowerChatHasNext.value && !fetchingMoreChat.value) return;
    fetchingMoreLowerChat.value = true;
    const ascChats = await fetchChatWithParam("asc", lowerCursor.value, 10);
    lowerCursor.value = ascChats.results[ascChats.results.length - 1].id;
    chats.value.push(...ascChats.results);
    isLowerChatHasNext.value = ascChats.meta.has_next;
    fetchingMoreLowerChat.value = false;
    return;
  }

  async function fetchChatWithId() {
    fetchingMoreChat.value = true;
    const descChats = await fetchChatWithParam("desc", upperCursor.value, 10);

    chats.value.unshift(...descChats.results.reverse());

    upperCursor.value = descChats.results[0]?.id;
    isUpperChatHasNext.value = descChats.meta.has_next;
    fetchingMoreChat.value = false;
  }

  async function fetchMoreChats() {
    if (!hasMore.value || firstLoad.value) return;
    fetchingMoreChat.value = true;

    const chatRes = await fetchChatWithParam();

    chats.value.unshift(...chatRes.results.reverse());

    if (chatRes.meta.has_next) {
      lastItemId.value = chatRes.results[0].id;
      hasMore.value = true;
    } else {
      hasMore.value = false;
    }
  }
  fetchingMoreChat.value = false;
}, 300);

async function onSubmit() {
  if (messagePayload.value.message.trim() === "") return;

  await addChat(roomID, messagePayload.value.message.trim(), replyMsgId.value);

  messagePayload.value.message = "";
  replyMsgId.value = undefined;
  sleepScrollToBottom();
}

async function onRateSeller() {
  if (!orderID.value) return;

  try {
    await rateSeller(orderID.value, {
      score: rateScore.value,
      comment: rateComment.value,
    });
  } catch (error: any) {
    showFailToast(error);
  } finally {
    showConfirmationPopup.value = false;
    rateScore.value = 0;
    rateComment.value = "";
  }
}
</script>

<style lang="css">
.stop-scrolling {
  height: 100%;
  overflow: hidden;
}
</style>
