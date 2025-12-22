async function getValidFirstImage(
  raw: string | string[] | Record<string, any> | null
): Promise<string> {
  if (!raw) return "";

  let list: string[] = [];

  // Case 1: Already an array
  if (Array.isArray(raw)) {
    list = raw.map(String);

    // Case 2: Object (e.g. {0: "...", 1: "..."})
  } else if (typeof raw === "object") {
    list = Object.values(raw).map(String);

    // Case 3: String
  } else if (typeof raw === "string") {
    let normalized = raw.trim();

    // ✅ Postgres array text: {url1,url2}
    if (normalized.startsWith("{") && normalized.endsWith("}")) {
      normalized = normalized.slice(1, -1);
      list = normalized.split(",").map((s) => s.trim());

      // JSON array string: ["url1","url2"]
    } else if (normalized.startsWith("[")) {
      try {
        const parsed = JSON.parse(normalized);
        if (Array.isArray(parsed)) {
          list = parsed.map(String);
        }
      } catch {
        list = [normalized];
      }

      // Plain string URL
    } else {
      list = [normalized];
    }
  }

  if (list.length === 0) return "";

  let url = list[0]?.trim();
  if (!url || url === "N/A") return "";

  // Normalize Kijiji image URL
  url = url
    .replace(/\.jpg\/.*$/, ".jpg")
    .replace("kijijica-200", "kijijica-800");

  // Optional validation (can be removed for speed)
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) return url;
  } catch {
    // ignore
  }

  return "";
}

export default getValidFirstImage;
