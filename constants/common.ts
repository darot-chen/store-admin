import type { FooterItem } from "~/types/common";

export const FOOTER_ITEMS: FooterItem[] = [
  {
    icon: "/svg/house.fill.svg",
    label: "home",
    key: "home",
    link: "/",
  },
  {
    icon: "/svg/bubble.left.and.bubble.right.fill.svg",
    label: "chat",
    key: "chat",
    link: "/room",
  },
  {
    icon: "/svg/person.crop.circle.fill.svg",
    label: "account",
    key: "account",
    link: "/account",
  },
];
