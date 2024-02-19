const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://kd3805:kd%40123@cluster0.tsxq3nw.mongodb.net/gayatri?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose
    .connect(mongoURL)
    .then(() => console.log("MongoDB connected successfully..."))
};

module.exports = { connectDB };
