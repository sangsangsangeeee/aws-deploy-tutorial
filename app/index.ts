import dotenv from "dotenv";
import * as redis from "redis";
import { createApp } from "./app";

dotenv.config();

const { PORT, REDIS_URL } = process.env;

if (!PORT) throw new Error("PORT is reqruied");
if (!REDIS_URL) throw new Error("REDIS_URL is reqruied");

const startServer = async () => {
  const client = redis.createClient({ url: REDIS_URL });
  await client.connect();

  const app = createApp(client);

  app.listen(PORT, () => {
    console.info(`app listening as port : ${PORT}`);
  });
};

startServer();
