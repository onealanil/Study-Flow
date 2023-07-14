const express = require("express");
const dotenv = require("dotenv");
const route = express.Router();
const UserInfoModel = require("../mongoDB/UserInfo");
const PostInfoModel = require("../mongoDB/PostSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("../mongoDB/Connection");
const nodemailer = require("nodemailer");
const authenticate = require("../middleware");
const NotificationModel = require("../mongoDB/NotificationSchema");
const StoryModel = require("../mongoDB/StorySchema");
const BASE_URL = process.env.BASE_URL;
dotenv.config();

//signup
route.post("/signup", async (req, res) => {
  try {
    const { username, fullname, email, password, gender } = req.body;
    const findEmail = await UserInfoModel.findOne({ email });
    const findUsername = await UserInfoModel.findOne({ username });
    if (findEmail && findEmail.isVerified === 1) {
      return res.status(422).json({ message: "Email already exists" });
    }
    if (findEmail && findEmail.isVerified === 0) {
      return res.status(422).json({
        message:
          "Your email is not verified, check your gmail and verify it, to login",
      });
    }
    if (findUsername) {
      return res.status(422).json({ message: "Username already exists" });
    }
    if (password.length <= 8) {
      return res
        .status(422)
        .json({ message: "Your password must contains at least 8 letter" });
    }
    if (username.length <= 3 || username.length >= 14) {
      return res.status(422).json({
        message:
          "Your username must contains at least 3 letter and not more than 14 letters",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    //send verification mail
    const verificationLink = `${BASE_URL}/studyflow/verify-email/${verificationToken}`;

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "lawrence.ondricka73@ethereal.email",
        pass: "jRJa1zXDps9k6aDp5N",
      },
    });

    let mailOptions = {
      from: "lawrence.ondricka73@ethereal.email",
      to: email,
      subject: "Verify your email!",
      text: "Verify Email",
      html: `<div style="font-family: Arial, sans-serif; font-size: 16px;">
      <div>
      <span style="color: #f5190a;">
        Emotional Outlets
      </span>
    </div>
      <h2 style="color: #f5190a;">Email Verification</h2>
      <p style="margin-bottom: 20px;">Thank you ${fullname} for signing up! Please verify your email address by clicking the button below:</p>
      <a href="${verificationLink}" style="background-color: #f5190a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Verify Email</a>
      <p style="margin-top: 20px;">If the button above doesn't work, you can also verify your email by copying and pasting the following link into your browser:</p>
      <p style="margin-top: 10px;"><a href="${verificationLink}" style="color: #007bff;"> ${verificationLink} </p>
    </div>`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        const signupUser = new UserInfoModel({
          email,
          password: hashedPassword,
          username,
          fullname,
          gender,
          verificationToken,
        });
        await signupUser.save();
        res.status(200).json({
          message: "User signed up. Check your email for verification link.",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//signup-verification token
route.get("/studyflow/verify-email/:token", async (req, res) => {
  const html = `
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
    </head>
      <style>
        body {
          text-align: center;
          padding: 40px 0;
          background: #EBF0F5;
        }
          h1 {
            color: #88B04B;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-weight: 900;
            font-size: 40px;
            margin-bottom: 10px;
          }
          p {
            color: #404F5E;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-size:20px;
            margin: 0;
          }
        i {
          color: #9ABC66;
          font-size: 100px;
          line-height: 200px;
          margin-left:-15px;
        }
        .card {
          background: white;
          padding: 60px;
          border-radius: 4px;
          box-shadow: 0 2px 3px #C8D0D8;
          display: inline-block;
          margin: 0 auto;
        }
      </style>
      <body>
        <div class="card">
        <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
          <i class="checkmark">✓</i>
        </div>
          <h1>SuccessFully verified</h1> 
          <p>Now you can login<br/><a href="http://localhost:3000/login"> Go to login page</a></p>
        </div>
      </body>
  </html>
  `;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserInfoModel.findOneAndUpdate(
      { email: decoded.email, verificationToken: token },
      { isVerified: 1, $unset: { verificationToken: 1 } }
    );

    if (user) {
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } else {
      res.status(400).send("Invalid verification token.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid verification token.");
  }
});

//login -- user
route.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const findEmail = await UserInfoModel.findOne({ email });
  if (!findEmail || findEmail == null) {
    res.status(422).json({ message: "Email not found" });
  } else {
    if (findEmail.who !== "Teacher") {
      if (findEmail.isVerified === 1) {
        const decryptPass = await bcrypt.compare(password, findEmail.password);
        if (decryptPass) {
          jwt.sign(
            { userId: findEmail._id },
            process.env.SECRET_KEY,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) {
                return res
                  .status(404)
                  .json({ message: "You must login first" });
              }
              res.cookie(String(findEmail._id), token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
                sameSite: "lax",
              });
              res.status(200).json({ message: "Successfully, logged in" });
            }
          );
        } else {
          res.status(422).json({ message: "Email or Password doesn't match" });
        }
      } else {
        res.status(422).json({ message: "Your email is not verified!" });
      }
    }
  }
});

// edit profile
route.put("/editprofile", authenticate, async (req, res) => {
  try {
    const id = req.user._id;
    const bio = req.body.bio;
    const fullname = req.body.fullname;
    const img = req.body.img;

    if (bio === "" || fullname === "" || img === "") {
      res.status(404).send("fullname or bio or image can't be null");
    } else {
      await UserInfoModel.findByIdAndUpdate(
        { _id: id },
        { bio: bio, fullname: fullname, profilePic: img }
      );

      res.status(200).send("Updated successfully");
    }
  } catch (err) {
    res.status(404).send("Something went wrong when updating your data");
  }
});

// logout
route.post("/logout", (req, res) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    console.log("logged out");
    res.clearCookie(`${user.userId}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "successfully logged out" });
  });
});

//protocted route
route.get("/studyflow/verify", authenticate, (req, res) => {
  res.send(req.user);
});

// //get user
route.get("/user", authenticate, async (req, res) => {
  const userId = req.user;
  try {
    const user = await UserInfoModel.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

route.get("/getalluser", authenticate, async (req, res) => {
  try {
    const currentUser = req.user._id;
    const allUser = await UserInfoModel.find({
      _id: { $ne: currentUser },
    }).exec();
    console.log(allUser);
    res.status(200).json({ users: allUser });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

module.exports = route;
