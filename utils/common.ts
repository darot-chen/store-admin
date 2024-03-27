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

export const sleep = (ms: number): Promise<{ timeout: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ timeout: true });
    }, ms);
  });
};

export const isSeller = (sellerId: number): boolean => {
  const authStore = useAuthStore();
  return authStore.user?.id === sellerId;
};

export const isBuyer = (buyerId: number): boolean => {
  const authStore = useAuthStore();
  return authStore.user?.id === buyerId;
};

export const formatOrderId = (orderId: number) => {
  return `BS${orderId.toString().padStart(6, "0")}`;
};

export const scrollAnimatedFrame = (
  target: HTMLDivElement,
  prevScrollHeight: number,
  prevScrollTop: number
) => {
  const scrollHeight = target.scrollHeight ?? 0;
  if (scrollHeight) {
    requestAnimationFrame(async () => {
      await nextTick(() => {
        target.scrollTop = prevScrollTop + (scrollHeight - prevScrollHeight);
        target.style.overflow = "hidden";
        requestAnimationFrame(() => {
          target.style.overflow = "scroll";
        });
      });
    });
  }
};

export const getScrollData = (target: HTMLDivElement) => {
  const scrollTop = target?.scrollTop;
  const prevScrollHeight = target?.scrollHeight || 0;
  const prevScrollTop = target?.scrollTop || 0;
  const clientHeight = target?.clientHeight || 0;

  return { scrollTop, prevScrollHeight, prevScrollTop, clientHeight, target };
};

export const scrollToChatId = async (id: number) => {
  await nextTick(() => {
    const target = document.getElementById(`chat_${id}`);
    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: "instant",
          block: "start",
          inline: "start",
        });
      });
    }
  });
};
