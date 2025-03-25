const express = require("express");
const router = express.Router();
const UserProfile = require("../models/userProfile");
const auth = require("../middleware/auth");
const OnlineUser = require("../models/onlineUser");

router.get("/", async (req, res) => {
  try {
    const profiles = await UserProfile.find({});

    if (!profiles.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.get("/online", async (req, res) => {
//   try {
//     const onlineUsers = await OnlineUser.find();
//     const onlineUsernames = onlineUsers.map((user) => user.username);

//     const profiles = await UserProfile.find({ name: { $in: onlineUsernames } });

//     res.status(200).json(profiles);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/major/:major", async (req, res) => {
//   try {
//     const { major } = req.params;
//     const profiles = await UserProfile.find({ major: major });

//     res.status(200).json(profiles);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
