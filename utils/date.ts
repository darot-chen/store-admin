import dayjs from "dayjs";

export const formatDate = (
  date: string | undefined | null,
  format?: string
) => {
  if (!date) return;

  const { locale } = useI18n();
  const localeStr = locale.value.substring(0, 2);

  if (format) {
    return dayjs(date).locale(localeStr).format(format);
  }

  const isCurrentYear = dayjs(date).isSame(date, "year");
  const yearBasedFormat = isCurrentYear
    ? "MM/DD HH:mm:ss"
    : "YYYY/MM/DD HH:mm:ss";

  return dayjs(date).locale(localeStr).format(yearBasedFormat);
};

export const formatChatListDate = (date: string) => {
  if (dayjs().isSame(date, "day")) {
    return dayjs(date).format("HH:mm");
  } else if (dayjs().isSame(date, "week")) {
    return dayjs(date).format("ddd");
  }

  return dayjs(date).format("MM/DD");
};
