async function getValidFirstImage(raw: string | null): Promise<string> {
  if (!raw) return "";

  let list: string[] = [];

  let normalized = raw.trim();
  if (normalized.startsWith("[") && normalized.includes("'")) {
    normalized = normalized.replace(/'/g, '"');
  }

  try {
    const parsed = JSON.parse(normalized);
    if (Array.isArray(parsed)) list = parsed.map(String);
  } catch {
    list = [raw];
  }

  if (list.length === 0) return "";

  let url = list[0].trim();

  if (!url || url === "N/A") return "";

  url = url
    .replace(/\.jpg\/.*$/, ".jpg")
    .replace("kijijica-200", "kijijica-800");

  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok && res.status < 400) {
      return url;
    }
  } catch {}

  return "";
}

export default getValidFirstImage;
