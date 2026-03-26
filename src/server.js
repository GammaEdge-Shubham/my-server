import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = new DynamoDBClient({
  region: "ap-south-1",
});

const docClient = DynamoDBDocumentClient.from(client);

app.get("/check", (req, res) => {
  return res.status(200).json({
    message: "server is up",
    statusCode: 200,
  });
});

app.post("/add-user", async (req, res) => {
  try {
    const item = {
      id: Date.now().toString(),
      ...req.body,
    };

    await docClient.send(
      new PutCommand({
        TableName: "users",
        Item: item,
      }),
    );

    return res.status(201).json({
      status: "success",
      message: "Data is created",
      data: item,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating data" });
  }
});

app.get("/get-users", async (req, res) => {
  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: "users",
      }),
    );

    return res.status(200).json({
      status: "success",
      message: "Fetched all data",
      data: result.Items,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
