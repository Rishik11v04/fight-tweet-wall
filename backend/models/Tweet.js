const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tweet", tweetSchema);
