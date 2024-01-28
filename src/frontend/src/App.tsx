import React, { JSX } from "react";
import HeadFC from "./components/Header.tsx";
import ButtonFC from "./components/Button.tsx";
export default function AppFC(): JSX.Element {

  return (
    <>
      <HeadFC name={"Notes"} classname={"header"} classnameCall={"update-button"} nameCall={""}
        Call={(cnameCall: string, nameCall: string) => <ButtonFC classname={cnameCall} name={nameCall} />} />
    </>
  )
}
