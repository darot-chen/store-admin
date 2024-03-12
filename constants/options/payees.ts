import type { Option } from "~/types/common";

export const COMMISSION_PAY_OPTIONS: Option[] = [
  {
    label: "卖家付",
    value: "buyer",
  },
  {
    label: "供方付",
    value: "seller",
  },
  {
    label: "两个都",
    value: "both",
  },
];
