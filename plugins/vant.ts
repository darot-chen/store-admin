import { defineNuxtPlugin } from "#app";
import Vant, { Locale } from "vant";
import zhCN from "vant/es/locale/lang/zh-CN";
import enUS from "vant/es/locale/lang/en-US";
import "vant/lib/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const { $i18n } = useNuxtApp();
  const { getLocaleCookie } = $i18n;
  const local = getLocaleCookie();

  if (local === "zh") {
    Locale.use("zh-HK", zhCN);
  } else {
    Locale.use("en-US", enUS);
  }

  const messages = {
    "zh-CN": {
      vanCalendar: {
        title: "選擇日期",
      },
    },
  };

  Locale.add(messages);

  nuxtApp.vueApp.use(Vant);
});
