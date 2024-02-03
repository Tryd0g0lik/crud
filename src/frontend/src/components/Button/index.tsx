import React, { JSX, useEffect } from "react";
import "./Button.css";
import { Str } from "../intarfaces.ts";
export default function ButtonFC({ classname, name }: Str): JSX.Element {

  return (
    <div className={classname}>
      <button type="submit">{name}</button>
    </div>
  );
}
