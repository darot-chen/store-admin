import { LOCALE_KEY } from "~/constants/key";

export const isSSR = () => typeof Window === "undefined";

export const getLocal = () => useCookie(LOCALE_KEY).value;
export const setLocal = (local: string) =>
  (useCookie(LOCALE_KEY).value = local);

type MapFunc<T = any, R = any> = (val: T, index?: number, arr?: T[]) => R;
const isString = <T = any>(str: string | T): str is string => {
  return typeof str === "string";
};

export const groupBy = <T = any>(arr: T[], fn: MapFunc<T> | string) =>
  arr
    .map(isString(fn) ? (val: any) => val[fn] : fn)
    .reduce((acc: Record<string | number, T[]>, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

export const isEmptyObject = (obj: any) => {
  return JSON.stringify(obj) === "{}";
};

export const truncateMidString = (str: string, left = 6, right = 6) => {
  if (!str) return "";
  if (str.length <= left + right) return str;
  return `${str.substring(0, left)}...${str.substring(
    str.length - right,
    str.length
  )}`;
};
