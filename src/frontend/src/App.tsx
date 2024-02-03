import React, { JSX, useEffect, useState, } from "react";
import "./App.css";
import HeadFC from "./components/Header/index.tsx";
import ButtonFC from "./components/Button/index.tsx";
import BoxiesFC from "./components/Box/index.tsx";
import TextFC from "./components/Textares/index.tsx";
// import { Name, Str } from "./components/intarfaces.ts";
import { WSocket } from "./functions/websocats.ts";
let oldData: string = "";
let listInit = [] as any[];
let indUP:number = 0;
export default function AppFC(): JSX.Element {
  const [arr, setArr] = useState(listInit);
  let dataUP: any;
  
  const hadlerGetLStorage = () => {
    console.log("[updateButton]");
    const lStorage = localStorage.getItem("data");
   
    console.log("[test 1]");
    if ((lStorage === null) || (lStorage === undefined) ||
      (oldData.includes(lStorage))) {
      console.log("[test 1.1]");
      dataUP = setTimeout(() => {
        console.log("[test 1.2]");
        hadlerGetLStorage();
        console.log("[test 1.3]");
        indUP++;
        if (indUP >= 15) {
          console.log("[test 1.3.1]");
          clearTimeout(dataUP);
        }
        console.log("[test 1.4]");
      }, 1500);
      console.log("[test 1.5]");
      return;
    }
    console.log("[test 2]");
    indUP++
    const datas = lStorage.slice(0);
    oldData = lStorage.slice(0);
    listInit = JSON.parse(datas).data;
    // handlerTextarea(datas);
    console.log("[test 3]");
    const arrJson = JSON.parse(datas);
    console.log("[test 3.1]");
    const dataArr = arrJson.data;
    console.log("[test 3.2]");
    const newArr = (dataArr).slice();
    console.log("[test 3.4]");
    setArr(newArr);
  };

  useEffect(() => {   
    /* загрузка данных как только загрузиться страница */
    // clearTimeout(dataUP);
    console.log("[test 4]");
    const divBittonSend = document.querySelector(".textarea .send");
    if ((divBittonSend !== null) || (divBittonSend !== undefined)) {
      console.log("[test 4.1]");
      (divBittonSend as HTMLDivElement).addEventListener("mousedown", hadlerGetLStorage);
    }

    // return () => {
    //   (divBittonSend as HTMLDivElement).removeEventListener("mousedown", () => {
    //     hadlerGetLStorage();
    //   });
    // }
    console.log("[test 5]");
    const updateButton = document.querySelector(".update-button");
    if ((updateButton !== null) && (updateButton !== undefined)) {
      console.log("[test 5.1]");
      console.log("[updateButton]", updateButton);
      (updateButton as HTMLDivElement).addEventListener("mousedown", hadlerGetLStorage);
    }
    console.log("[test 6]");
    hadlerGetLStorage();
    return () => {
      console.log("[test 6.1]");
      (updateButton as HTMLDivElement).removeEventListener("mousedown", hadlerGetLStorage);
      console.log("[test 6.2]");
      (divBittonSend as HTMLDivElement).removeEventListener("mousedown", hadlerGetLStorage);
    }

  }, [arr]);

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      const divTarget = (e.target as HTMLDivElement);
      const divParent = (divTarget.parentElement as HTMLDivElement).parentElement as HTMLDivElement;
      if (divParent.className.includes("box")) {
        const ws = new WSocket("ws://localhost:7070");
        const uniqueInd = (divParent.dataset.ind as string).slice(0);
        if ((uniqueInd !== null) && (uniqueInd !== undefined)) {
          // divParent.remove();
          ws.onRemove = uniqueInd;
          // ws.onClose();
          // hadlerGetLStorage();

          // setArr(listInit.slice(0))


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
        // if ((divUnmountingArray[i] !== null) && (divUnmountingArray[i] !== undefined)) {
        (divUnmountingArray[i] as HTMLDivElement).removeEventListener("click", handler);
        // }
      }
    };
  }, [arr]);


  console.log("[test 7]");
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
