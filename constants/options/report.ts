import type { Option } from "~/types/common";

export const REPORT_TAB_OPTION: Option[] = [
  { label: "用户模式", value: "user" },
  { label: "商户模式", value: "merchant" },
];

export const REPORT_CHECKBOX_OPTION: Option[] = [
  { label: "今天", value: "user" },
  { label: "本周", value: "本周" },
  { label: "本月", value: "本月" },
  { label: "本年", value: "本年" },
];
