export default async function priceStatus(
  price: number | null,
  est_value: number | null
) {
  if (!est_value || !price || isNaN(price)) return "Unknown";
  const difference = est_value - price;
  const differencePercent = (difference / price) * 100;
  if (difference >= 0) {
    return "Steal";
  } else if (
    difference < 0 &&
    difference >= -3000 &&
    differencePercent >= -10
  ) {
    return "Good";
  } else if (difference >= -5000 && differencePercent >= -20) {
    return "Potential";
  } else {
    return "Entertain";
  }
}
