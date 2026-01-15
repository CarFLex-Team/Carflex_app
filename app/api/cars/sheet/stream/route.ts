export const runtime = "nodejs";

import { addClient, removeClient } from "@/lib/sheetEvents/sheetEvents";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // A sheet viewer connected
      addClient(controller);
    },
    cancel(controller) {
      // Sheet viewer disconnected (tab closed, refresh, etc.)
      removeClient(controller);
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
