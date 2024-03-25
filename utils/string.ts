import { CHAT_ACTIONS } from "~/constants/chat-actions";

export const getChatEvent = (type: string, name?: string) => {
  const { t } = useNuxtApp().$i18n;

  if (type === CHAT_ACTIONS.JOIN) {
    return t("name_has_joined_the_chat", {
      name,
    });
  } else if (type === CHAT_ACTIONS.LEAVE) {
    return t("name_has_left_the_chat", {
      name,
    });
  } else {
    return t(type);
  }
};

export const getChatEventIcon = (type: string) => {
  if (type === CHAT_ACTIONS.JOIN) {
    return "mdi-account-plus";
  } else if (type === CHAT_ACTIONS.LEAVE) {
    return "mdi-account-minus";
  } else if (
    type === CHAT_ACTIONS.ORDER_SUCCESS ||
    type === CHAT_ACTIONS.BUYER_CONFIRM_ORDER ||
    type === CHAT_ACTIONS.BUYER_COMPLETE_ORDER ||
    type === CHAT_ACTIONS.SELLER_COMPLETE_ORDER
  ) {
    return "tabler:check";
  } else if (
    type === CHAT_ACTIONS.BUYER_REJECT ||
    type === CHAT_ACTIONS.SELLER_CANCEL
  ) {
    return "mdi-close";
  } else {
    return "tabler:info-circle-filled";
  }
};
