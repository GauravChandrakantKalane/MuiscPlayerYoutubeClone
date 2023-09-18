const admin = require("../config/firebase.config");
const router = require("express").Router();
const User = require("../models/user");

// logs in the user and returns back the currently logged in user
router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(505).send({ message: "Unauthorized" });
    } else {
      // checking user exits or not
      const userExists = await User.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        newUserData(decodeValue, req, res);
      } else {
        updateUserData(decodeValue, req, res);
      }
    }
  } catch (err) {
    return res.status(505).send({ message: err });
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = new User({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res
      .status(200)
      .send({ message: "User saved successfully...", data: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = { upsert: true, new: true };
  try {
    const updatedUser = await User.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ data: updatedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

// get all users
router.get("/getAllUsers", async (req, res) => {
  const options = { sort: { createAt: 1 } };
  try {
    const result = await User.find(options);
    if (result) {
      return res.status(200).send({ success: true, data: result });
    } else {
      return res.status(400).send({ success: false, msg: "Data not found" });
    }
  } catch (err) {
    return res.status(400).send({ msg: err });
  }
});

// update user role
router.put("/updateRole/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const role = req.body.data.role;

  try {
    const result = await User.findOneAndUpdate(filter, { role: role });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

// delete user
router.delete("/deleteUser/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await User.deleteOne(filter);
  if (result.deletedCount === 1) {
    return res
      .status(200)
      .send({ success: true, msg: "Deleted Successfully..." });
  } else {
    return res.status(500).send({ success: false, msg: "Data not found...." });
  }
});

module.exports = router;
