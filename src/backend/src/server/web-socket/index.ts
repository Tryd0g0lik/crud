const dbFile = require("../db/dbase.json");
const { Ind } = require("../getId");
const keys = new Ind();

module.exports = (wss: any, WS: any) => {
  return wss.on("connection", (ws: any, req: any) => {
    ws.on("error", () => { console.error("WS ERROR"); });
    ws.on("message", (mess: any) => {
      const url = req.url.slice(0);
      let messJson = JSON.parse(mess);

      for (let line in messJson) {
        if ((messJson.line).length > 0) {
          const ind = keys.indAdd();

          if (line.includes("data") && (typeof (ind).includes("string"))) {
            // dbFile.line.push({ messJson.line[ind] });
          }
        }
      }
    });
  })
}
