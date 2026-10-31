import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./server.js";

async function request(path) {
  const app = createApp();
  await new Promise((resolve) => app.listen(0, resolve));
  const { port } = app.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}${path}`);
    return { status: res.status, body: await res.text() };
  } finally {
    app.close();
  }
}

test("GET / returns hello", async () => {
  const res = await request("/");
  assert.equal(res.status, 200);
  assert.equal(res.body, "hello");
});

test("unknown path returns 404", async () => {
  const res = await request("/nope");
  assert.equal(res.status, 404);
});
