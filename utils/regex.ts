export function isUrl(url: string): boolean {
  const reg = /^(http|https):\/\/[^ "]+$/;
  return reg.test(url);
}
