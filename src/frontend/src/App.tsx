import React, { JSX, useEffect, useState } from "react";
import "./App.css";
import HeadFC from "./components/Header/index.tsx";
import ButtonFC from "./components/Button/index.tsx";
import BoxiesFC from "./components/Box/index.tsx";
import TextFC from "./components/Textares/index.tsx";
import { Name } from "./components/intarfaces.ts";
let oldData: string = "";

export default function AppFC(): JSX.Element {
  const [arr, setArr] = useState([]);
  const handlerTextarea = (datas: Name) => {
    const arrJson = JSON.parse(datas as string);
    const dataArr = arrJson.data;
    const newArr = (dataArr as any[]).slice();
    setArr(newArr);
  };

  useEffect(() => {
    const hadlerGetLStorage = () => {
      const lStorage = localStorage.getItem("data");
      // const divContent = document.querySelector(".content");
      if ((lStorage === null) || (lStorage === undefined) ||
        (oldData.includes(lStorage))) {
        return setTimeout(() => {
          hadlerGetLStorage();
        }, 1500);
      }
      console.log("[LS]: ", typeof lStorage);
      const datas = lStorage.slice(0);
      // const content = (divContent as HTMLDivElement).innerHTML;
      handlerTextarea(datas);
      // (divContent as HTMLDivElement).innerHTML = content + { arr };
    };
    const divBittonSend = document.querySelector(".textarea .send");
    if (divBittonSend === null || divBittonSend === undefined) {
      return;
    }
    (divBittonSend as HTMLDivElement).addEventListener("mousedown", () => {
      hadlerGetLStorage();
    });
    return () => {
      (divBittonSend as HTMLDivElement).removeEventListener("mousedown", () => {
        hadlerGetLStorage();
      });
    };
  });
  return (
    <>
      <HeadFC name={"Notes"} classname={"h"} classnameCall={"update-button"} nameCall={""} /* заголовок с кнопкой для обновления */
        Call={(cnameCall: string, nameCall: string) => <ButtonFC classname={cnameCall} name={nameCall} />} />
      <div className="content">
        {/* < BoxiesFC name="сюда вставляем текст" classname="box" classnameCall="unmounting" /* контейнер с кнопкой для закрытия  */}
        {/* Call={(cnameCall: string, nameCall: string) => <ButtonFC classname={cnameCall} name={nameCall} /> */}
        {/* } /> */}
        {arr.map((data) => (

          < div key={Object.entries(data)[0][0]} >
            < BoxiesFC name={(Object.entries(data)[0][1] as Record<string, string>).textarea} classname="box" >
              <ButtonFC classname="unmounting" name="" />
            </BoxiesFC>
          </div>
        ))}

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
