type EventPayload = {
  type:
    | "sheet:dabou:update"
    | "sheet:lead:update"
    | "sheet:ibrahim:update"
    | "sheet:omar:update";
  data?: any;
};

let clients: ReadableStreamDefaultController[] = [];

export function addClient(controller: ReadableStreamDefaultController) {
  clients.push(controller);
}

export function removeClient(controller: ReadableStreamDefaultController) {
  clients = clients.filter((c) => c !== controller);
}

export function emitEvent(event: EventPayload) {
  const message = `data: ${JSON.stringify(event)}\n\n`;
  console.log(clients.length + " clients to notify about event", event.type);
  for (const client of clients) {
    try {
      client.enqueue(message);
    } catch {
      // disconnected client
    }
  }
}
