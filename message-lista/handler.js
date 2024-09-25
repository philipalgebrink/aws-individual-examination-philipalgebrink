const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// GET all messages or by username
app.get("/messages", async (req, res) => {
  const { username } = req.query;

  if (username) {
    // Make sure the IndexName matches your GSI name exactly
    const params = {
      TableName: USERS_TABLE,
      IndexName: "username-index", // This must match the name of your GSI exactly
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": username,
      },
    };

    try {
      const command = new QueryCommand(params);
      const { Items } = await docClient.send(command);
      res.json(Items);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Could not retrieve messages by username" });
    }
  } else {
    // Fetch all messages if no username is provided
    const params = {
      TableName: USERS_TABLE,
    };

    try {
      const command = new ScanCommand(params);
      const { Items } = await docClient.send(command);
      res.json(Items); // Send back all messages
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not retrieve messages" });
    }
  }
});

// POST message
app.post("/messages", async (req, res) => {
  const { id, username, text, createdAt } = req.body;

  if (!id || !username || !text || !createdAt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { id, username, text, createdAt },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ id, username, text, createdAt }); // Respond with the saved message
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not save message" });
  }
});

// PUT endpoint for editing a message
app.put("/messages/:id", async (req, res) => {
  const { id } = req.params;
  const { text, username } = req.body; // Assuming text and username are updated

  if (!text || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const params = {
    TableName: USERS_TABLE,
    Key: { id },
    UpdateExpression: "set #text = :text, #username = :username",
    ExpressionAttributeNames: {
      "#text": "text",
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":text": text,
      ":username": username,
    },
    ReturnValues: "ALL_NEW", // Return updated item
  };

  try {
    const command = new UpdateCommand(params);
    const { Attributes } = await docClient.send(command); // Attributes contain the updated item
    res.json(Attributes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the message" });
  }
});

// Catch-all route for 404
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Export the app with serverless!
exports.handler = serverless(app);
