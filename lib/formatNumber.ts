const formatNumber = (value: string) => {
  // Remove non-digits
  const numericValue = value.replace(/\D/g, "");
  if (!numericValue) return "";
  // Add commas
  return parseInt(numericValue).toLocaleString();
};
export default formatNumber;
