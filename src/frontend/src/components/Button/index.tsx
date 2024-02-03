import React, { JSX, useEffect } from "react";
import "./Button.css";
import { Str } from "../intarfaces.ts";
// import { WSocket } from "../../functions/websocats.ts";

export default function ButtonFC({ classname, name, ind }: Str): JSX.Element {

  // useEffect(() => {
  //   const handler = (e: MouseEvent): void => {
  //     const divTarget = (e.target as HTMLDivElement);
  //     const divParent = (divTarget.parentElement as HTMLDivElement).parentElement as HTMLDivElement;
  //     if (divParent.className.includes("box")) {
  //       const ws = new WSocket("ws://localhost:7070");
  //       const uniqueInd = (divParent.dataset.ind as string).slice(0);
  //       if ((uniqueInd !== null) && (uniqueInd !== undefined)) {
  //         divParent.remove();
  //         ws.onRemove = uniqueInd;
  //         // ws.onClose();

  //       };

  //     };
  //   };
  //   const divUnmountingArray = document.querySelectorAll(".unmounting"); // удаляем контейнер
  //   for (let i = 0; i < divUnmountingArray.length; i++) {
  //     if ((divUnmountingArray[i] !== null) && (divUnmountingArray[i] !== undefined)) {
  //       (divUnmountingArray[i] as HTMLDivElement).addEventListener("click", handler);
  //     }
  //   };
  //   return () => {
  //     for (let i = 0; i < divUnmountingArray.length; i++) {
  //       // if ((divUnmountingArray[i] !== null) && (divUnmountingArray[i] !== undefined)) {
  //       (divUnmountingArray[i] as HTMLDivElement).removeEventListener("click", handler);
  //       // }
  //     }
  //   };
  // }, [ind]);


  return (
    <div className={classname}>
      <button type="submit">{name}</button>
    </div>
  );
}
