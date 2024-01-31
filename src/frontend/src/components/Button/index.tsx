import React, { JSX, useEffect } from "react";
import "./Button.css";
import { Str } from "../intarfaces.ts";

export default function ButtonFC({ classname, name }: Str): JSX.Element {
  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      const divTarget = (e.target as HTMLDivElement);
      const divParent = (divTarget.parentElement as HTMLDivElement).parentElement as HTMLDivElement;
      if (divParent.className.includes("box")) {
        divParent.remove();
      };
    };
    const divUnmounting = document.querySelector(".unmounting"); // удаляем контейнер
    if ((divUnmounting !== null) || (divUnmounting !== undefined)) {
      (divUnmounting as HTMLDivElement).addEventListener("click", handler);
    };

    return (() => {
      (divUnmounting as HTMLDivElement).removeEventListener("click", handler);
    });
  });
  return (
    <div className={classname}>
      <button type="submit">{name}</button>
    </div>
  );
}
