const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rishik11v04:rishik445442@cluster0.wegwyhs.mongodb.net/tweetwall"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
