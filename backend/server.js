const express = require("express");
const http = require("http");
const cors = require("cors");

const connectDB = require("./config/db");
const Tweet = require("./models/Tweet");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDB();

// GET all tweets (newest first)
app.get("/tweets", async (req, res) => {
  const tweets = await Tweet.find().sort({ createdAt: -1 });
  res.json(tweets);
});

// POST new tweet
app.post("/tweet", async (req, res) => {
  const tweet = new Tweet({ text: req.body.text });
  await tweet.save();
  res.json(tweet);
});

// 🗑️ DELETE tweet
app.delete("/tweet/:id", async (req, res) => {
  await Tweet.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
