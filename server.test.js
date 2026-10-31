import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./server.js";

async function request(path) {
  const app = createApp();
  await new Promise((resolve) => app.listen(0, resolve));
  const { port } = app.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}${path}`);
    return { status: res.status, type: res.headers.get("content-type"), body: await res.text() };
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
  assert.equal(res.type, "application/json");
  assert.deepEqual(JSON.parse(res.body), { error: "not found", path: "/nope" });
});

test("GET /health returns ok JSON", async () => {
  const res = await request("/health");
  assert.equal(res.status, 200);
  assert.equal(res.type, "application/json");
  assert.deepEqual(JSON.parse(res.body), { status: "ok" });
});
