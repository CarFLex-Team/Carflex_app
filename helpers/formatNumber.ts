function formatNumber(value: string | number): string {
  let num: number;
  if (!value) return "";
  if (typeof value === "string") {
    num = Number(value.replace(/\D+/g, ""));
    if (isNaN(num)) return value;
  } else {
    num = value;
  }
  return `${num.toLocaleString()}`;
}
export default formatNumber;
