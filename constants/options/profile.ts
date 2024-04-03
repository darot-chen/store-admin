import type { Option } from "~/types/common";
import { UserMode } from "~/types/user";

export const PROFILE_TAB_OPTIONS: Option[] = [
  { label: "用户模式", value: UserMode.USER },
  { label: "商户模式", value: UserMode.MERCHANT },
];
