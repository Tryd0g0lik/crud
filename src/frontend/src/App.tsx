import React, { JSX, useCallback, useEffect, useState, } from "react";
import "./App.css";
import HeadFC from "./components/Header/index.tsx";
import ButtonFC from "./components/Button/index.tsx";
import BoxiesFC from "./components/Box/index.tsx";
import TextFC from "./components/Textares/index.tsx";
import { Name, Str } from "./components/intarfaces.ts";
let oldData: string = "";
let listInit = [] as any[];

export default function AppFC(): JSX.Element {
  const [arr, setArr] = useState(listInit);

  const handlerTextarea = (datas: Name) => {
    const arrJson = JSON.parse(datas);
    const dataArr = arrJson.data;
    const newArr = (dataArr).slice()
    setArr(newArr);
  };

  const updateData = useCallback(handlerTextarea, [arr]);
  useEffect(() => {
    const hadlerGetLStorage = () => {
      const lStorage = localStorage.getItem("data");

      if ((lStorage === null) || (lStorage === undefined) ||
        (oldData.includes(lStorage))) {
        setTimeout(() => {
          hadlerGetLStorage();
        }, 1500);
        return;
      }

      const datas = lStorage.slice(0);
      oldData = lStorage.slice(0);
      listInit = JSON.parse(datas);
      updateData(datas);
    };
    const divBittonSend = document.querySelector(".textarea .send");
    if (divBittonSend === null || divBittonSend === undefined) {
      return;
    }
    (divBittonSend as HTMLDivElement).addEventListener("mousedown", () => {
      hadlerGetLStorage();
    });
    return;
  }, [arr]);
  return (
    <>
      <HeadFC name={"Notes"} classname={"h"} classnameCall={"update-button"} nameCall={""} /* заголовок с кнопкой для обновления */
        Call={(cnameCall: string, nameCall: string) => <ButtonFC classname={cnameCall} name={nameCall} />} />
      <div className="content">
        {
          arr.map((data: any) => (
            < BoxiesFC ind={Object.entries(data)[0][0] as string} name={(Object.entries(data)[0][1] as Record<string, string>).textarea} classname="box" >
              <ButtonFC ind={Object.entries(data)[0][0] as string} classname="unmounting" name="" />
            </BoxiesFC>
          )
          )
        }
      </div>
      <div className="h3">
        <h3>New note</h3>
      </div>
      <TextFC>
        <ButtonFC classname="send" name={""} />
      </TextFC>
    </>
  );
}
