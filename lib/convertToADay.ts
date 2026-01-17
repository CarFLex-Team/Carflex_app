function convertToADay(dateString: string): Date {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
}
export default convertToADay;
