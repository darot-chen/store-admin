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
    const totalFee = (amount * feePercentage + fixedFee) * rate;

    return Number((amount * rate + totalFee).toFixed(2)); // Seller received
  } else {
    return Math.round(
      Number(
        ((amount * rate) / (1 + feePercentage) - fixedFee * rate).toFixed(2)
      )
    ); // Buyer paid
  }
}
