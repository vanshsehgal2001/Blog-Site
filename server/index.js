const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");
const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const profileRoute = require("../routes/profile");
const postRoute = require("../routes/post");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
app.use(express.json());

const db = mongoose.connection;
db.once("connected", () => {
  console.log("Connected to Mongo-DB");
});
db.once("error", (err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
