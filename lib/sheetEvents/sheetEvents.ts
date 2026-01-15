
let clients: ReadableStreamDefaultController[] = [];

export function addClient(controller: ReadableStreamDefaultController) {
  clients.push(controller);
}

export function removeClient(controller: ReadableStreamDefaultController) {
  clients = clients.filter((c) => c !== controller);
}

export function notifySheetUpdate() {
  for (const client of clients) {
    try {
      client.enqueue(`data: update\n\n`);
    } catch {
      // client likely disconnected
    }
  }
}
