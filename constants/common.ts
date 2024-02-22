import type { FooterItem } from "~/types/common";

export const FOOTER_ITEMS: FooterItem[] = [
  {
    icon: "Home",
    label: "home",
    key: "home",
    link: "/",
  },
  {
    icon: "Chat",
    label: "chat",
    key: "chat",
    link: "/room",
  },
  {
    icon: "Person",
    label: "account",
    key: "account",
    link: "/account",
  },
];
