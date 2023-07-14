const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  verificationToken: {
    type: String,
    required: true,
  },
  who:{
    type:String,
    default: "Student"
  },
  gender: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Number,
    default: 0,
  },
});

const UserInfoModel = mongoose.model("userInformation", UserInfoSchema);

module.exports = UserInfoModel;
