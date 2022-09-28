const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hi mom!",
  });
});

app.post("/product/:id", (req, res) => {
  const { params } = req;
  res.status(200).json({
    params,
  });
});

app.get("/products", (req, res) => {
  const { query } = req;
  res.status(200).json({
    query,
  });
});

app.post("/product", (req, res) => {
  const { body } = req;
  res.status(200).json({
    body,
  });
});

app.listen(3333);