/* eslint-disable no-extend-native */
Number.prototype.toVFixed = function (this: number, fractionDigits?: number) {
  const lastTwoDigits = this.toFixed(2).slice(-2);

  if (lastTwoDigits === "00") {
    return this.toFixed(0);
  } else {
    return this.toFixed(fractionDigits || 2);
  }
};
