import { Hono } from "hono";
import { cors } from "hono/cors";
import { Users } from "./data";

const app = new Hono();

// 全て許可
app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/user", (c) => {
  // 奇数秒の場合はエラーを返す
  if (new Date().getSeconds() % 2 === 1) {
    return c.json(Users[1])
  }
  return c.json(Users[0]);
});

export default app;
