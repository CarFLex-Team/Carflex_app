function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "CANADA/Eastern",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
}

export default formatDateTime;
