require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Successfully connected");
  })
  .catch((err) => {
    console.log("An Error Occured", err);
  });

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB successfully connected");
});
db.on("error", (err) => console.error("NOT WORKING", err));

const subscribersRouter = require("./routes/subscriber");
app.use("/subscribers", subscribersRouter);

app.listen(3000, () => {
  console.log("The server has started on port 3000");
});
