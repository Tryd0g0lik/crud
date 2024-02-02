import React, { JSX } from "react";
import { Str } from "../intarfaces.ts";
import "./Box.css";

/**
 * `Str` from the `intarface.ts`
 * `Classname` from the `intarface.ts`
 * `Name` from the `intarface.ts`
 *
 * @param `props`:`Str` `{ classname:string, name:string, Call:  (classnameCall: Classname, nameCall: Name) => React.JSX.Element, classnameCall:string, nameCall:string }`
 * @returns `<div className={classname}> {Call((classnameCall as string), (nameCall as string))}? {name} </div>`
 */
export default function BoxiesFC(props: Str): JSX.Element {
  // const { classname, name, Call, classnameCall, nameCall } = { ...props };
  const { classname, name, children } = { ...props };
  if (children !== undefined) {
    return (
      <div className={classname}>
        {children}
        {name}
      </div>
    );
  } else {
    return (
      <div className={classname}>
        {name}
      </div>
    );
  }
}
