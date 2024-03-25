import { ChatType, type Chat } from "~/types/chat";

export function renderNotification(m: Chat) {
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;
  const notificationStore = useNotificationStore();

  if (m.type === ChatType.Text) {
    notificationStore.addNotification({
      title: m.user?.name || "",
      message: m?.message || "",
      icon: "Chat",
      duration: 10000,
    });
    notificationStore.setActiveId(m.chat_room_id);
  } else if (m.type === ChatType.Image || m.type === ChatType.Video) {
    notificationStore.addNotification({
      title: m.user?.name || "",
      message: t("send_an_attachment"),
      icon: "tabler:photo",
      duration: 10000,
    });
    notificationStore.setActiveId(m.chat_room_id);
  } else if (m.type === ChatType.Action) {
    notificationStore.addNotification({
      title: m.user?.name || "",
      message: getChatEvent(m.message, m.user?.name),
      icon: getChatEventIcon(m.message),
      duration: 10000,
    });
    notificationStore.setActiveId(m.chat_room_id);
  }
}
