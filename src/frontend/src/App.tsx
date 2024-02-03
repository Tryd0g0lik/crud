import React, { JSX, useCallback, useEffect, useState, } from "react";
import "./App.css";
import HeadFC from "./components/Header/index.tsx";
import ButtonFC from "./components/Button/index.tsx";
import BoxiesFC from "./components/Box/index.tsx";
import TextFC from "./components/Textares/index.tsx";
import { Name, Str } from "./components/intarfaces.ts";
let oldData: string = "";
let listInit = [] as any[];
let indUP:number = 0;
export default function AppFC(): JSX.Element {
  const [arr, setArr] = useState([]);

  const handlerTextarea = (datas: Name) => {
    const arrJson = JSON.parse(datas);
    const dataArr = arrJson.data;
    const newArr = (dataArr).slice() 
    setArr(newArr);
  };
  let dataUP: any;
  
  const hadlerGetLStorage = () => {
    console.log("[updateButton]");
    const lStorage = localStorage.getItem("data");
   
    // debugger;
    if ((lStorage === null) || (lStorage === undefined) ||
      (oldData.includes(lStorage))) {
      dataUP = setTimeout(() => {
        hadlerGetLStorage();
        indUP++;
        if (indUP >= 10) {
          clearTimeout(dataUP);
        }
      }, 1500);
      return;
    }
    indUP++
    const datas = lStorage.slice(0);
    oldData = lStorage.slice(0);
    listInit = JSON.parse(datas)["data"];
    handlerTextarea(datas);
  };
  // const updateData = useCallback(handlerTextarea, []);

  useEffect(() => {   
    clearTimeout(dataUP);
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
      }

  }, [arr]);
  useEffect(() => { 
    const updateButton = document.querySelector(".update-button");
    if ((updateButton === null) && (updateButton === undefined)) {
      return;
    }
    console.log("[updateButton]", updateButton);
    (updateButton as HTMLDivElement).addEventListener("mousedown", hadlerGetLStorage);
    return () => {
      (updateButton as HTMLDivElement).removeEventListener("mousedown", hadlerGetLStorage);
    }
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
