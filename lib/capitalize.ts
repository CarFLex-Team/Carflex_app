const capitalize = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "-";
export default capitalize;
