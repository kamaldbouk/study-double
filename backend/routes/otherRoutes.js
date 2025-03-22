// const express = require("express");
// const router = express.Router();
// const OnlineUser = require("../models/onlineUsers");

// router.post("/add", async (req, res) => {
//   const { username } = req.body;
//   try {
//     const existing = await OnlineUser.findOne({ username });
//     if (!existing) {
//       const user = new OnlineUser({ username });
//       await user.save();
//     }
//     res.status(200).send({ success: true });
//   } catch (err) {
//     res.status(500).send({ error: "Failed to add user" });
//   }
// });

// router.post("/remove", async (req, res) => {
//   const { username } = req.body;
//   try {
//     await OnlineUser.deleteOne({ username });
//     res.status(200).send({ success: true });
//   } catch (err) {
//     res.status(500).send({ error: "Failed to remove user" });
//   }
// });

// module.exports = router;
