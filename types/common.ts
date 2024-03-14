export type Cursor = {
  limit?: number;
  last?: number;
  order_by?: "asc" | "desc";
};

export type Option = {
  value: string;
  label: string;
  icon?: string;
};

export type FooterItem = {
  key: string;
  label: string;
  icon: string;
  link: string;
};

export type Cell = {
  title: string;
  icon?: string;
  backgroundColor?: string;
  iconColor?: string;
  onClick?: () => void;
};

export enum FeeTypeEnum {
  HANDLING_FEE_PERCENTAGE = "handlingFeePercentage",
  RATE = "rate",
  OTHER_FEE = "otherFee",
}

export type FeeType =
  | FeeTypeEnum.HANDLING_FEE_PERCENTAGE
  | FeeTypeEnum.RATE
  | FeeTypeEnum.OTHER_FEE;
