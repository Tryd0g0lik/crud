import React, { JSX, MouseEventHandler, useEffect, useState, useCallback } from "react";
import "./Textarea.css";
interface Child {
  children: JSX.Element
}

export default function TextFC({ children }: Child): JSX.Element {
  let str = "";
  const [code, setCode] = useState("");
  const handleKeyPress = useCallback((event: any) => {
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
      str = "";
      setCode("");
    } else {
      str += (event.key as string);
      setCode(str);
    }
  }, []);
  useEffect(() => {
    const textareaDiv = document.querySelector(".textarea");
    if ((textareaDiv === null) || (textareaDiv === undefined)) {
      return;
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
