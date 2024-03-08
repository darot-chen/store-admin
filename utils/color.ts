const colors = [
  "#ff8a65",
  "#ffcc80",
  "#fff59d",
  "#dcedc8",
  "#80cbc4",
  "#80deea",
  "#81d4fa",
  "#80deea",
  "#b0bec5",
  "#ffab91",
  "#ffcc80",
  "#ffee58",
  "#dcedc8",
  "#80cbc4",
  "#80deea",
];

export function generateLinearGradient(username: string, length: number = 0) {
  const usernameColor = colors[(username.length + length) % colors.length];
  const linearGradient = `linear-gradient(135deg, ${usernameColor} 0%, ${generateColor(usernameColor)} 50%, ${generateColor(usernameColor)} 100%)`;

  return linearGradient;
}

export function generateColorForName(username: string) {
  const usernameColor = colors[username.length % colors.length];
  return generateColor(usernameColor);
}

export const generateColor = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }

  const darkerColor = color.replace(/^#/, "");
  const rgb = parseInt(darkerColor, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const darkerR = Math.round(r * 0.8);
  const darkerG = Math.round(g * 0.8);
  const darkerB = Math.round(b * 0.8);
  const darkerHex = `#${((darkerR << 16) | (darkerG << 8) | darkerB).toString(16).padStart(6, "0")}`;

  return darkerHex;
};

export const deterMineBlackOrWhite = (hexcolor: string) => {
  const hex = hexcolor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
};

export const contrastColor = (hexcolor: string) => {
  const hex = hexcolor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#ffffff" : "#000000";
};
