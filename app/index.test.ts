import request from "supertest";
import * as redis from "redis";

import { App } from "supertest/types";
import { RedisClient, createApp } from "./app";
import { after } from "node:test";

let app: App;
let client: RedisClient;

beforeAll(async () => {
  client = redis.createClient({ url: "redis://localhost:6379" });
  await client.connect();

  app = createApp(client);
});

beforeEach(async () => {
  await client.flushDb();
});
afterAll(async () => {
  await client.flushDb();
  await client.quit();
});

describe("POST /messages", () => {
  it("responds with success messages", async () => {
    const response = await request(app)
      .post("/messages")
      .send({ message: "testing with redis" });

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("message added to list");
  });
});

describe("GET /messages", () => {
  it("responds with all messages", async () => {
    await client.lPush("messages", ["list1", "list2"]);

    const response = await request(app).get("/messages");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(["list2", "list1"]);
  });
});
