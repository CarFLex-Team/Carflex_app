async function verifyCarFetch(imageSrc: string): Promise<string> {
  const res = await fetch("https://dummyjson.com/c/e21c-227c-43b4-99c5", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageSrc }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();
  return data.title; // string result
}
export default verifyCarFetch;
