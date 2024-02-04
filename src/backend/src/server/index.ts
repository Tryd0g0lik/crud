const http = require("http");
const Koa = require("koa");
const cors = require("@koa/cors");
const logger = require("koa-logger");

const WS = require("ws");
const WSSoerverBody = require("./web-socket/index");

const app = new Koa();
app.use(logger());
app.use(cors());

const server = new http.Server(app.callback());
const wss = new WS.Server({ server: server });
const PORT = process.env.PORT || String(7070);

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

(WSSoerverBody as any)(wss, WS);
server.listen(PORT, () => {
  console.log("[serve: Server has been started.]: ", PORT);
});
