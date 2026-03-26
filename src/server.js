import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Data from "./models/data.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/check", (req, res) => {
  return res.status(200).json({
    message: "server is up",
    statusCode: 200,
  });
});

app.post("/add-data", async (req, res) => {
  const newData = await Data.create(req.body);
  return res.status(201).json({
    status: "success",
    message: "Data is created",
    newData,
    statusCode: 201,
  });
});

app.get("/get-all", async (req, res) => {
  const allData = await Data.find();
  return res.status(200).json({
    status: "success",
    message: "Fetched all data",
    allData,
    statusCode: 200,
  });
});

app.listen(
  3000,
  async () => console.log("Server is listening on http://localhost:3000"),
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("Something is wrong with DB", error)),
);
