const express = require("express");
const router = express.Router();
const UserProfile = require("../models/userProfile");
const auth = require("../middleware/auth");

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


module.exports = router;
