export default function truckChecker(title: string) {
  const truckKeywords = [
    "150",
    "250",
    "350",
    "ram",
    "sierra",
    "silverado",
    "tundra",
    "tacoma",
  ];
  return truckKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword.toLowerCase()),
  );
}
