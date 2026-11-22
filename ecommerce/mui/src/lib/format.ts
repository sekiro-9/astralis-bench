const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return currency.format(amount);
}

export function discountPercent(price: number, originalPrice: number) {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
