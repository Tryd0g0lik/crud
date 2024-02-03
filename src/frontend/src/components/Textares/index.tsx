import React, { JSX, MouseEventHandler, useEffect, useState, useCallback } from "react";
import { WSocket } from "../../functions/websocats.ts";
import "./Textarea.css";
import { Child } from "../intarfaces.ts";

export default function TextFC({ children }: Child): JSX.Element {
  let str = "";
  const [code, setCode] = useState("");
  function Ws(url: string): void {
    let ws: any;
    if ((ws !== true) || ((ws === true) &&
      ((ws.readyState < 1) &&
        (ws.readyState > 1)))) {
      ws = new WSocket(url);
    }
    const sendersStr = { open: [], data: [{ textarea: str }], removes: [] };

    ws.onSend = sendersStr;
  }

  /**
   * Контекст textarea
   */
  const handlerKeyBoardPress = useCallback((event: any) => {
    if ((event.key as string).includes("Backspace")) {
      str = str.slice(0, -1);
      setCode(str);
    } else if ((event.key as string).includes("Shift")) {
      null;
    } else if ((event.key as string).includes("Control")) {
      null;
    } else if ((event.key as string).includes("ArrowRight")) {
      null;
    } else if ((event.key as string).includes("ArrowLeft")) {
      null;
    } else if ((event.key as string).includes("ArrowDown")) {
      null;
    } else if ((event.key as string).includes("ArrowUp")) {
      null;
    } else if ((event.key as string).includes("NumLockc")) {
      null;
    } else if ((event.key as string).includes("Enter")) {
      str = str + "\r\n";
    } else if ((event.key as string).includes("HomeDelete") || (event.key as string).includes("Delete")) {
      str = "".slice(0);
      setCode("");
    } else {
      str += (event.key as string).slice(0);
      setCode(str);
    }
  }, []);

  /**
   * обработчик нажатой кнопки для отправки textarea на сервер
   */
  const handlerSendClick = (): void => {
    Ws("ws://localhost:7070");
  };

  useEffect(() => {
    const sendDiv = document.querySelector(".send"); /* кнопка для отправки textarea на сервер */
    if ((sendDiv === null) && (sendDiv === undefined)) {
      /* прослушка кнопки для отправки textarea на сервер */
      return;
    };
    (sendDiv as HTMLDivElement).addEventListener("click", handlerSendClick);
    document.addEventListener("keydown", handlerKeyBoardPress);

    return () => {
      document.removeEventListener("keydown", handlerKeyBoardPress);
      (sendDiv as HTMLDivElement).removeEventListener("click", handlerSendClick);
    };
  }, [handlerKeyBoardPress]);

  const handlerMouse: MouseEventHandler<HTMLDivElement> = (e): void => {
    const divElement = e.target as HTMLElement;
    if ((divElement !== null) && (divElement !== undefined)) {
      null;
    }
  };

  return <div className="textarea" onClick={handlerMouse}>
    <div>{code}</div>
    {children}
  </div>;
}
