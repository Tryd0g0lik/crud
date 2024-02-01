import dbFile = require("../db/dbase.json");
import { Ind } from "../getId";
const keys = new Ind();

module.exports = (wss: any, WS: any): any => {
  const result = wss.on("connection", (ws: any, req: any): void => {
    ws.on("error", (): void => { console.error("WS ERROR"); });
    ws.on("message", (mess: string): void => {
// const url = req.url.slice(0);
      let messJson = JSON.parse(mess);
      for (let line in messJson) {
        if ((messJson.line).length > 0) {
          const ind = keys.indAdd();
          if ((line.includes("data")) && ((typeof ind).includes("string"))) {
            // dbFile.line.push({ messJson.line[ind] });
            WS;
          }
        }
      }
    });
  });
  return result;
};
