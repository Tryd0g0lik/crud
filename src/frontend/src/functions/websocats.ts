import { Send } from "./intaerfaces.ts";
export class WSocket {
  socket: Record<any, any>;
  handlers: { open: any[], data: any[], removes: any[] };
  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.addEventListener("open", () => {
      console.warn("[WebSocket]: Server was OPEN: ", this.socket.readyState);
      this.onSend;
    });
    this.socket.addEventListener("message", (e: Event) => {
      console.warn("[WebSocket]: Server was MESSAGE: ", this.socket.readyState);
      console.warn("[WebSocket]: Server was e.MESSAGE: ", e);
    });
    this.socket.addEventListener("close", (e: any) => {
      e.wasClean === true ? console.warn("[WebSocket]: Server was CLOSE: ", this.socket.readyState) : null;
    });
    this.handlers = {
      open: [],
      data: [],
      removes: []
    };
  }

  set onSend({ ...senders }: Send) {
    // const transactionKeys = ["open", "data", "removes"];
    const s = Array.from(Object.entries({ ...senders }));
    this.handlers = { ...senders };
    console.log("[set onSend]: ", s);
  }

  get onSend(): Send {
    const sendersStr = JSON.stringify({ ...this.handlers });
    this.socket.send(sendersStr);
    return this.handlers;
  }
}
