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
    /**
     * Extends the Number prototype to include a custom method to format numbers with a fixed number of digits after the decimal point,
     * but if the last two digits are both zero, it returns the number without decimal places.
     * @param fractionDigits The number of digits to appear after the decimal point. Default is 2.
     * @returns A string representation of the number with the specified number of digits after the decimal point, or without decimal places if the last two digits are both zero.
     */
    toVFixed(fractionDigits: number): string;
  }
}

export {};
