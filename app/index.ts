import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello from express");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.info(`app listening as port : ${PORT}`);
});
