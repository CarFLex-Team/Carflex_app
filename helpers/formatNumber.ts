function formatNumber(value: string): string {
  if (!value) return "";

  const num = Number(value.replace(/\D+/g, ""));
  if (isNaN(num)) return value;

  return `${num.toLocaleString()}`;
}
export default formatNumber;
