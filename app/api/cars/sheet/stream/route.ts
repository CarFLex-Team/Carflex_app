export const runtime = "nodejs";

import { addClient, removeClient } from "@/lib/sheetEvents/sheetEvents";

export async function GET() {
  const abortController = new AbortController();
  const stream = new ReadableStream({
    start(controller) {
      // A sheet viewer connected
      addClient(controller);
      abortController.signal.addEventListener("abort", () => {
        removeClient(controller); // Clean up when client disconnects
      });
    },
    cancel(controller) {
      // Sheet viewer disconnected (tab closed, refresh, etc.)
      abortController.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
