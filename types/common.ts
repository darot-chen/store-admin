export type Cursor = {
  limit?: number;
  last?: number;
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
