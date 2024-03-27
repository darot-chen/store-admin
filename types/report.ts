export type ReportParam = {
  start_date: string;
  end_date: string;
};

export type Summary = {
  total_payment: number;
  total_amount: number;
};

export type ReportTransaction = {
  keys: Date[];
  data: { [key: string]: Summary };
  summary: Summary;
};
