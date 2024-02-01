import i = require("../getId");
import dbFile = require("../db/dbase.json");
const keys = new i.Ind();

module.exports = (wss: any, WS: any): any => {
  const result = wss.on("connection", (ws: any, req: any): void => {
    ws.on("error", (): void => { console.error("WS ERROR"); });
    ws.on("message", (mess: string): void => {
      // const url = req.url.slice(0);
      let messJson = JSON.parse(mess);
      const ind = keys.indAdd();
      console.log("[IND: ", ind);
      for (let line in messJson) {
        console.log("[line.length]: ", (messJson[line]).length);
        if ((messJson[line]).length > 0) {

          if ((line.includes("data")) && ((typeof ind).includes("string"))) {
            JSON.stringify(dbFile);
            console.log("[dbFile]: ", (dbFile as any)[line]);
            console.log("[messJson]: ", (messJson as any)[line]);
            console.log("[IND 2: ", ind);
            // let newObj: Record<string, Record<any, string>>[(ind as string)] = (messJson[line][0] as Record<any, string>);
            // newObj[(ind as string)] = messJson[line][0];

            // const newObj = { "key": (ind as string), "textarea": (messJson[line][0]["textarea"] as string) };
            const k = Object.keys(messJson[line][0]);
            let o: Record<string, string> = {};
            o[k[0]] = (messJson[line][0]["textarea"] as string);
            let newObj: Record<string, any> = {};
            const strInd = ind as string;
            newObj[strInd] = o;
            console.log("[newObj]: ", newObj);
            (dbFile as any)["data"].push(newObj);
            wss.clients.forEach((client: any) => {
              if ((client === ws) && (client.readyState === WS.OPEN)) {
                const dbFileSTR = JSON.stringify(dbFile);
                client.send(dbFileSTR);
                console.log("The  dbFile has been sended to the front", ". dbFile: ", dbFile);
              }
            })
          }
        }
      }
    });
  });
  return result;
};
