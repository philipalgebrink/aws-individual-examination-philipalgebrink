const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
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
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// GET all messages
app.get("/messages", async (req, res) => {
  const params = {
    TableName: USERS_TABLE,
  };

  try {
    const command = new ScanCommand(params);
    const { Items } = await docClient.send(command);
    res.json(Items); // Send back the items (messages)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve messages" });
  }
});

// POST message
app.post("/messages", async (req, res) => {
  const { id, username, text } = req.body; // Make sure to include the message structure

  if (!id || !username || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { id, username, text }, // Ensure this matches your DynamoDB table schema
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ id, username, text }); // Respond with the saved message
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not save message" });
  }
});

// GET user
app.get("/users/:userId", async (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
});

// POST user
app.post("/users", async (req, res) => {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    return res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    return res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { userId, name },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ userId, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

// Catch-all route for 404, very bad
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Export the app with serverless!
exports.handler = serverless(app);
