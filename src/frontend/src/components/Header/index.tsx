import React, { JSX } from "react";
import "./Header.css";
import { Str } from "../intarfaces";
/**
 * 
 * @param `props`: ` { name, classname, Call, classnameCall, nameCall }` \
 * Here a `Call` is the `(cnameCall: string, nameCall: string) => < < Component-name > classname={cnameCall} name={nameCall} />`
 * @returns `<div className={classname}> <h2>{name}</h2> </div>`
 */
export default function HeadFC(props: Str): JSX.Element {
  const { name, classname, Call, classnameCall, nameCall } = props;
  if (Call !== undefined) {
    return (
      <div className={classname}>
        <h2 >{name}</h2>
        {Call(classnameCall as string, nameCall as string)}
      </div>
    )
  } else {
    return (
      <div className={classname}>
        <h2 >{name}</h2>
      </div>
    )
  }
}

