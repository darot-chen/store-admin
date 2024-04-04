let telegram: any = null;

export const getTelegramWebApp = () => {
  if (telegram !== null) {
    return telegram.WebApp;
  }
  const tg = (window as any).Telegram;
  if (tg?.WebApp && tg?.WebApp?.initData) {
    telegram = tg;
    return tg.WebApp;
  }

  return null;
};

export const onMainButtonClick = (text: string, callback: () => void) => {
  const tg = getTelegramWebApp();
  if (tg && tg?.MainButton) {
    tg.MainButton.offClick(() => {});

    tg.MainButton.setText(text);
    tg.MainButton.show();
    tg.MainButton.onClick(callback);
  }
};
