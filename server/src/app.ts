require("dotenv").config({ path: "./config.env" });

import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import CustomError from "./errors/CustomError";
import incomeRoutes from "./routes/income";

// const errorHandler = require("./middleware/error");

const app = express();

require("dotenv").config();

connectDB();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/income", incomeRoutes);

// handles all non existing routes
app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

// Error Handler (Should be last middleware)
// app.use(errorHandler);

const server = http.createServer(app);

server.listen(2402, async () => {
  console.log(`Server running on port: 2402`);
});

export default app;
