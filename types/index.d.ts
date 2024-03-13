import dayjs from "dayjs";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

declare module "#app" {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs;
  }
  interface PageMeta {
    title?: string;
    back?:
      | string
      | boolean
      | ((
          route: RouteLocationNormalizedLoaded,
          router: Router
        ) => string | void);
  }
}

declare global {
  interface Number {
    toVFixed(fractionDigits: number): string;
  }
}

export {};
