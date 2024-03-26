import type { ReportParam, ReportTransaction } from "~/types/report";

const url = "/transactions";

export const getReportTransaction = async (params: ReportParam) => {
  const { data } = await useAxiosInstance().get<ReportTransaction>(
    `${url}/group`,
    {
      params,
    }
  );
  return data;
};
