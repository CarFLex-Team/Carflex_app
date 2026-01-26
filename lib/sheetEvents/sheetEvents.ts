type EventPayload = {
  type: "sheet:caller:update" | "sheet:lead:update";

  data?: any;
};
export const runtime = "nodejs";

type SSEClient = ReadableStreamDefaultController;

declare global {
  var __sheetClients: SSEClient[] | undefined;
}

const clients = (global.__sheetClients ??= []);

export function addClient(controller: ReadableStreamDefaultController) {
  clients.push(controller);
}

export function removeClient(controller: ReadableStreamDefaultController) {
  const index = clients.indexOf(controller);
  if (index !== -1) clients.splice(index, 1);
}

export function emitEvent(event: { type: string }) {
  const msg = `data: ${JSON.stringify(event)}\n\n`;

  for (const client of clients) {
    try {
      client.enqueue(msg);
    } catch (e) {
      // ignore broken clients
    }
  }
}
