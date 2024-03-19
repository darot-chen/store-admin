/* eslint-disable import/no-named-as-default-member */
import dayjs from "dayjs";
import zh from "dayjs/locale/zh-hk";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp();
  const { getLocaleCookie } = $i18n;
  const local = getLocaleCookie();

  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.extend(updateLocale);
  dayjs.extend(advancedFormat);
  dayjs.extend(timezone);
  dayjs.extend(utc);

  dayjs.updateLocale(zh.name, {
    relativeTime: {
      future: "%s后",
      past: "%s前",
      s: "几秒",
      m: "1 分钟",
      mm: "%d 分钟",
      h: "1 小时",
      hh: "%d 小时",
      d: "1 天",
      dd: "%d 天",
      M: "1 个月",
      MM: "%d 个月",
      y: "1 年",
      yy: "%d 年",
    },
  });
  dayjs.locale(local === "zh" ? zh : "");

  return {
    provide: {
      dayjs,
    },
  };
});
