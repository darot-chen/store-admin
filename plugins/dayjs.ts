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
  dayjs.locale(local === "zh" ? zh : "");
  return {
    provide: {
      dayjs,
    },
  };
});
