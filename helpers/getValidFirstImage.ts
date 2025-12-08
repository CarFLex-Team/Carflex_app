async function getValidFirstImage(raw: string | null): Promise<string> {
  if (!raw) return "";

  let list: string[] = [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) list = parsed.map(String);
  } catch {
    list = [raw];
  }

  if (list.length === 0) return "";

  let url = list[0].trim();
  if (!url || url === "N/A") return "";

  url = url.replace(/\.jpg\/.*$/, ".jpg");

  // Validate via HEAD request
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok && res.status < 400) {
      return url;
    }
  } catch {}

  return "";
}
export default getValidFirstImage;
