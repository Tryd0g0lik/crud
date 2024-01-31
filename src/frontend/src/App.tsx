import React, { JSX } from "react";
import "./App.css";
import HeadFC from "./components/Header/index.tsx";
import ButtonFC from "./components/Button/index.tsx";
import BoxiesFC from "./components/Box/index.tsx";
import TextFC from "./components/Textares/index.tsx";
export default function AppFC(): JSX.Element {
  return (
    <>
      <HeadFC name={"Notes"} classname={"h"} classnameCall={"update-button"} nameCall={""} /* заголовок с кнопкой для обновления */
        Call={(cnameCall: string, nameCall: string) => <ButtonFC classname={cnameCall} name={nameCall} />} />
      <div className="content">
        <BoxiesFC name="сюда вставляем текст" classname="box" classnameCall="unmounting" /* контейнер с кнопкой для закрытия */
          Call={(cnameCall: string, nameCall: string) => <ButtonFC classname={cnameCall} name={nameCall} />} />
      </div>
      <div className="h3">
        <h3>New note</h3>
      </div>
      <TextFC>
        <ButtonFC classname={"send"} name={""} />
      </TextFC>
    </>
  );
}
