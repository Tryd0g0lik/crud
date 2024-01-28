import React, { JSX } from "react";
import { Str } from "./intarfaces.ts";

export default function ButtonFC({ classname, name }: Str): JSX.Element {
  return (
    <div className={classname}>
      <button type="submit">{name}</button>
    </div>
  )
}
