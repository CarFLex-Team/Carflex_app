async function getValidFirstImage(
  raw: string | string[] | Record<string, any> | null
): Promise<string> {
  if (!raw) return "";

  let list: string[] = [];

  if (Array.isArray(raw)) {
    list = raw.map(String);
  } else if (typeof raw === "object") {
    list = Object.values(raw).map(String);
  } else if (typeof raw === "string") {
    let normalized = raw.trim();

    if (normalized.startsWith("[") && normalized.includes("'")) {
      normalized = normalized.replace(/'/g, '"');
    }

    try {
      const parsed = JSON.parse(normalized);
      if (Array.isArray(parsed)) {
        list = parsed.map(String);
      } else {
        list = [normalized];
      }
    } catch {
      list = [normalized];
    }
  }

  if (list.length === 0) return "";

  let url = list[0]?.trim();
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
