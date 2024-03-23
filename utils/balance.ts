export function calculateAmount(
  type: "buyer" | "seller",
  amount: number,
  exchangeRate: number,
  fee: {
    percentage: number;
    fixed: number;
  },
  buyerCurrency: string
) {
  const feePercentage = fee.percentage / 100;
  const fixedFee = fee.fixed;
  const rate = buyerCurrency === "USDT" ? 1 / exchangeRate : exchangeRate;

  if (type === "seller") {
    const totalFee =
      buyerCurrency === "USDT"
        ? amount * feePercentage * rate + fixedFee
        : (amount * feePercentage + fixedFee) * rate;

    return Number((amount * rate + totalFee).toFixed(2)); // Seller received
  } else {
    const amountWithRate =
      buyerCurrency === "USDT"
        ? (amount - fixedFee) / (1 / exchangeRate)
        : (amount - fixedFee * rate) / exchangeRate;

    return Math.round(
      Number((amountWithRate / (1 + feePercentage)).toFixed(2))
    ); // Buyer paid
  }
}
