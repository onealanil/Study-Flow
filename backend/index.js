const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
require("./mongoDB/Connection");
const userInfo = require("./loginSignup/User");
const post = require("./posts/post");
const MessageInfo = require("./message/Message");
// const adminPost = require("./admin/AdminPost");
app.use("/", userInfo);
app.use("/post", post);
app.use("/message", MessageInfo);
// app.use("/admin", adminPost);
const socketIO = require("socket.io");
const authenticate = require("./middleware");
app.use(authenticate);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
