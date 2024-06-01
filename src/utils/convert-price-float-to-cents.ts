export function convertPriceFloatToCents(value: number) {
  const priceInCents = Math.round(value * 100)

  return priceInCents
}
