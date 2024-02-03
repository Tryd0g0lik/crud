import React, { JSX, useEffect, useState, } from "react";
import "./App.css";
import HeadFC from "./components/Header/index.tsx";
import ButtonFC from "./components/Button/index.tsx";
import BoxiesFC from "./components/Box/index.tsx";
import TextFC from "./components/Textares/index.tsx";
import { WSocket } from "./functions/websocats.ts";
let oldData: string = ""; /* старые данные для сравнения - поступили новые или нет */
let listInit = [] as any[]; /* для статуса получаем новый массив и обновляем desctop */

let indUP: number = 0;  /* для того чтоб закрыть setTimout */
export default function AppFC(): JSX.Element {
  const [arr, setArr] = useState(listInit);
  let dataUP: any;
  
  const hadlerGetLStorage = () => {
    const lStorage = localStorage.getItem("data");

    if ((lStorage === null) || (lStorage === undefined) ||
      (oldData.includes(lStorage))) {
      dataUP = setTimeout(() => {
        hadlerGetLStorage();
        indUP++;
        if (indUP >= 15) {
          clearTimeout(dataUP);
        }
      }, 1500);
      return;
    }
    indUP++
    const datas = lStorage.slice(0);
    oldData = lStorage.slice(0);
    listInit = JSON.parse(datas).data;
    const arrJson = JSON.parse(datas);
    const dataArr = arrJson.data;
    const newArr = (dataArr).slice();
    setArr(newArr);
  };

  useEffect(() => {   
    /* загрузка данных как только загрузиться страница */
    const divBittonSend = document.querySelector(".textarea .send");
    if ((divBittonSend !== null) || (divBittonSend !== undefined)) {
      (divBittonSend as HTMLDivElement).addEventListener("mousedown", hadlerGetLStorage);
    }
    hadlerGetLStorage();
    return () => {
      (divBittonSend as HTMLDivElement).removeEventListener("mousedown", hadlerGetLStorage);
    }

  }, [arr]);

  /* Обновление */
  useEffect(() => { 
    const updateButton = document.querySelector(".update-button");
    if ((updateButton !== null) && (updateButton !== undefined)) {
      (updateButton as HTMLDivElement).addEventListener("mousedown", () => {
        hadlerGetLStorage();
        const ws = new WSocket("ws://localhost:7070");
        const sendersStr = { open: [], data: [], removes: [] };
        ws.onSend = sendersStr;
      });
    }
    hadlerGetLStorage();
    return () => {
      (updateButton as HTMLDivElement).removeEventListener("mousedown", hadlerGetLStorage);
    }
  }, [])

  /* удаляем */
  useEffect(() => {

    const handler = (e: MouseEvent): void => {
      const divTarget = (e.target as HTMLDivElement);
      const divParent = (divTarget.parentElement as HTMLDivElement).parentElement as HTMLDivElement;
      if (divParent.className.includes("box")) {
        const ws = new WSocket("ws://localhost:7070");
        const uniqueInd = (divParent.dataset.ind as string).slice(0);
        if ((uniqueInd !== null) && (uniqueInd !== undefined)) {
          ws.onRemove = uniqueInd;
        };
        listInit = JSON.parse((localStorage.getItem("data") as string).slice(0)).data;
        hadlerGetLStorage();
      };
    };
    const divUnmountingArray = document.querySelectorAll(".unmounting"); // удаляем контейнер
    if ((divUnmountingArray[0] !== null) && (divUnmountingArray[0] !== undefined)) {
      for (let i = 0; i < divUnmountingArray.length; i++) {

        (divUnmountingArray[i] as HTMLDivElement).addEventListener("click", handler);
      }
    };
    return () => {
      for (let i = 0; i < divUnmountingArray.length; i++) {
        (divUnmountingArray[i] as HTMLDivElement).removeEventListener("click", handler);
      }
    };
  }, [arr]);

  return (
    <>
      <HeadFC name={"Notes"} classname={"h"} classnameCall={"update-button"} nameCall={""} /* заголовок с кнопкой для обновления */
        Call={(cnameCall: string, nameCall: string) => <ButtonFC classname={cnameCall} name={nameCall} />} />
      <div className="content">
        {
          arr.map((data: any) => (

            < BoxiesFC key={Array.from(Object.entries(data))[0][0] as string}
              ind={Array.from(Object.entries(data))[0][0] as string}
              name={(Array.from(Object.entries(data))[0][1] as Record<string, string>).textarea}
              classname="box" >
              <ButtonFC classname="unmounting" name="" />
            </BoxiesFC>
          )
          )
        }
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
