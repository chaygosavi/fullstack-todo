import cors from "cors";
import "dotenv/config";
import express from "express";
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import todoRouter from "./routes/todo.js";

mongoose.set("strictQuery", true);

const port = process.env.PORT ?? 8001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", todoRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error, req, res, next) => {
  console.log("ERRORRRR => ", error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => {
    console.log("Server is running on " + port);
  });
});
