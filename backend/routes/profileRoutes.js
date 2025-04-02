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

router.post("/:id/personality-test", auth, async (req, res) => {
  const { id } = req.params;
  const { extraversion, agreeableness, conscientiousness, neuroticism, openness } = req.body;
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          "personalityTestResults.extraversion": extraversion,
          "personalityTestResults.agreeableness": agreeableness,
          "personalityTestResults.conscientiousness": conscientiousness,
          "personalityTestResults.neuroticism": neuroticism,
          "personalityTestResults.openness": openness,
        },
      },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Personality test results saved!", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/review", async (req, res) => {
  const { id } = req.params; 
  const { senderId, rating, description } = req.body; 

  console.log("receiver (profile being reviewed):", id);
  console.log("sender (reviewer):", senderId);

  try {
    if (!senderId || !rating || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingReview = await UserProfile.findOne({
      userId: id,
      "reviews.senderId": senderId,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already left a review." });
    }

    const newReview = { senderId, rating, description };

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: id },
      { $push: { reviews: newReview } },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(201).json({ message: "Review submitted successfully!", review: newReview });
  } catch (err) {
    console.error(err);
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
