import express from "express";
import { createCourse } from "./routes";

const app = express();

app.post("/", createCourse);

app.listen(3333);