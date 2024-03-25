import type { AppNotification } from "~/types/common";

export const useNotificationStore = defineStore({
  id: "notification-store",
  state: () => ({
    notifications: [] as AppNotification[],
    activeId: 0,
  }),
  actions: {
    addNotification(notification: {
      title: string;
      message: string;
      icon?: string;
      duration?: number;
    }) {
      this.notifications.push({
        ...notification,
        id: Date.now(),
        show: true,
      });
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    },
    setActiveId(id: number) {
      this.activeId = id;
    },
    clearActiveId() {
      this.activeId = 0;
    },
  },
});
