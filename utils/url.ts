import { joinURL } from "ufo";

export const getS3Url = (src: string) => {
  const baseURL = useRuntimeConfig().public.s3;

  return joinURL(baseURL, src);
};
