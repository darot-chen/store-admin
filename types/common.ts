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
