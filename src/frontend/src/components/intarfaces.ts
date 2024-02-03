import React from "react";
/**It's interface
 * @params {path:string}
 */
export interface Url {
  path: string
}


/**
 * @param: It's a type the `Classname` = `string`
 */
type Classname = string;

/**
 * @param: It's a type the `Name` = `string`
 */
export type Name = string;

/**
 * @param: `{name?: string}`
 * @param: `{datas?: string}`
 * @param: `{ind?: string}`
 * @param: `{classname?: string}`
 * @param: `{classnameCall?: string}`
 * @param: `{nameCall?: string}`
 * @param: `{Call?: (classnameCall: Classname, nameCall: Name) => React.JSX.Element}`
 * @param: `{children?: JSX.Element}`
 */
export interface Str {
  name?: string
  ind?: string
  datas?: string
  classname?: string
  classnameCall?: string
  nameCall?: string
  Call?: (classnameCall: Classname, nameCall: Name) => React.JSX.Element
  children?: JSX.Element
}

export interface Child {
  children: JSX.Element
}
