import i = require("../getId");
import dbFile = require("../db/dbase.json");
const keys = new i.Ind();

module.exports = (wss: any, WS: any): any => {
  const result = wss.on("connection", (ws: any, req: any): void => {
    ws.on("error", (): void => { console.error("WS ERROR"); });
    ws.on("message", (mess: string): void => {
      // const url = req.url.slice(0);
      let messJson = JSON.parse(mess);
      
      for (let line in messJson) {
        console.log("[line.length]: ", (messJson[line]).length);
        if ((messJson[line]).length > 0) {

          if ((line.includes("data"))) {
            const ind = keys.indAdd();
            if (!(typeof ind).includes("string")) {return}
            console.log("[IND: ", ind);
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
            const dbFileSTR = JSON.stringify(dbFile);
            console.log("[dbFileSTR]: ", dbFileSTR);
            wss.clients.forEach((client: any) => {
              if ((client === ws) && (client.readyState === WS.OPEN)) {

                client.send(dbFileSTR);
                console.log("The  dbFile has been sended to the front", ". dbFile: ", dbFileSTR);
              }
            })
          } else if (line.includes("removes")) {
            const key = messJson[line][0];
            console.log("[REMOVES]: key ", key);
            const arr = Array.from(Object.entries(dbFile["data"]));
           arr.forEach((data, ind, array) => { 
             
             console.log("[REMOVES]: arr ", array); 
             
             if (Object.keys(data[1])[0].includes(key)) {
               console.log("[REMOVES]: ind ", ind); 
               console.log("[REMOVES]: data.0 ", data[0]);
               const newDbFile: any[] = [];
               if (ind !== 0) {
                 console.log("[REMOVES]: ind !=0: ", dbFile["data"].slice(0, ind));
                 newDbFile.push((dbFile["data"].slice(0, ind))[0]);
               } else {
                 //  newDbFile.push((dbFile["data"].slice(0))[0]);
                 null;
               }
               if ((ind + 1) <= dbFile["data"].length - 1) {
                 newDbFile.push((dbFile["data"].slice(ind + 1))[0]);
                 
               }
               console.log("[REMOVES newDbFile AFTER]: ", newDbFile);
               (dbFile["data"] as any) = newDbFile;
               const dbFileSTR = JSON.stringify(dbFile);
               console.log("[REMOVES dbFileSTR]: ", dbFileSTR);
               wss.clients.forEach((client: any) => {
                 if ((client === ws) && (client.readyState === WS.OPEN)) {
                   console.log("[SERVER]: The message is sending for client: ", dbFileSTR);
                   client.send(dbFileSTR);
                   console.log("The  dbFile has been sended after a REMOVES", ". dbFile: ", dbFileSTR);
                 }
               })
               return
             } 
              // console.log("[REMOVES]: data ", dbFile["data"].key);  
            });
            // console.log("[REMOVES]: data ", dbFile["data"].key);
            
            // (dbFile as any)["data"].imdexOf(dbFile["data"][messJson[line][0]])
          } 

        }
      }
      /* обновлениею Если был запрос, но код "for (let line in messJson)" ни чего не нашел */
          wss.clients.forEach((client: any) => {
            const dbFileSTR = JSON.stringify(dbFile);
            if ((client === ws) && (client.readyState === WS.OPEN)) {
              console.log("[SERVER]: The message is sending for client: ", dbFileSTR);
              client.send(dbFileSTR);
              console.log("The  dbFile has been sended after a REMOVES", ". dbFile: ", dbFileSTR);
            }
          })
    });
  });
  return result;
};
