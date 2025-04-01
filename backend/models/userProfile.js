const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  preferredStudyTechnique: { type: String },
  averageSessionLength: { type: Number },
  
  personalityTestResults: {
    extraversion: { type: Number, default: 0 },
    agreeableness: { type: Number, default: 0 },
    conscientiousness: { type: Number, default: 0 },
    neuroticism: { type: Number, default: 0 },
    openness: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
