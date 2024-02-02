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
    this.socket.addEventListener("message", (e: any) => {
      console.warn("[WebSocket]: Server was MESSAGE: ", this.socket.readyState);
      console.warn("[WebSocket]: Server was e.MESSAGE: ", e.data as string);
      let mess = e.data as string;
      // mess = mess;
      localStorage.setItem("data", mess);
      console.log("[WebSocket] Sendig into LocalStorage");
      this.public(mess);
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
  /**
   * Переписываем базовую версию функции.
   * Запускаем в "this.socket.addEventListener(....)"
   * Функция должна получить данные из "localStorage"
   * После публикуем на decktope
   * @returns ...
   */
  public = (strjson: string): any => {
    return "here is your function for publics of the server datas" + strjson;
  };
}
