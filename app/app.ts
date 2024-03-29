import express from "express";
import { RedisClientType } from "redis";

const LIST_KEY = "messages";

export type RedisClient = RedisClientType<any, any, any>;

export const createApp = (client: RedisClient) => {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).send("hello from express");
  });

  app.post("/messages", async (request, response) => {
    const { message } = request.body;
    await client.lPush(LIST_KEY, message);
    response.status(200).send("message added to list");
  });

  app.get("/messages", async (request, response) => {
    const messages = await client.lRange(LIST_KEY, 0, -1);
    response.status(200).send(messages);
  });

  return app;
};
