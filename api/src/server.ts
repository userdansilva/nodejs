import express from "express";

const app = express();

app.get("/", (req, res) => res.json({
  message: "hi mom!",
}));

app.listen(3333, () => console.log("server is running"));
