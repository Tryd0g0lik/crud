import http = require("http");
import Koa = require("koa");
import cors = require("@koa/cors");
import logger = require("koa-logger");

import WS = require("ws");
import WSSoerverBody = require("./web-socket")

const app = new Koa();
app.use(logger());
app.use(cors());

const server = new http.createServer(app.callback());
const wss = new WS.Server({ server });
const PORT = (process.env.PORT != null) || String(7070);

// app.use(async (ctx: any, next: any) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   await next();
// })

app.use(async (ctx: any): Promise<void> => {
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.method)} and  PORT: ${PORT}`;
  console.log("ctx.status", ctx.status);
});

WSSoerverBody(wss, WS);
server.listen(PORT, () => {
  console.log("[serve: Server has been started.] ");
})
