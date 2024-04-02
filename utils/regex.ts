export function isUrl(url: string): boolean {
  const reg = /^(http|https):\/\/[^ "]+$/;
  return reg.test(url);
}

export function isTelegramUrl(url: string): boolean {
  const reg = /^(http|https):\/\/t\.me\/[^ "]+$/;
  return reg.test(url);
}
