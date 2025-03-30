const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const reviewSchema = new mongoose.Schema({
//   reviewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   rating: { type: Number, min: 1, max: 5, required: true },
//   description: { type: String, required: true },
// }, { timestamps: true });

const userProfileSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  mail: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  dob: { type: Date },
  country: { type: String },
  major: { type: String },
  communicationStyles: { type: String },
  biography: { type: String },
  personalityTestResults: { type: String },
  preferredStudyTechnique: { type: String },
  averageSessionLength: { type: Number },
  // reviews: [ reviewSchema ],
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
