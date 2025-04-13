const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String, required: true },
  // number of sessions counter from +
  // number of goals + number of ticked goals ratio 20/500
  // timer ????
  createdAt: { type: Date, default: Date.now }
});

const userProfileSchema = new Schema({
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
  preferredStudyLength: { type: Number },
  preferredBreakLength:  { type: Number },
  todayStudyLength: { type: Number },
  todayGoals: [{ type: String}],

  personalityTestResults: {
    extraversion: { type: Number, default: 0 },
    agreeableness: { type: Number, default: 0 },
    conscientiousness: { type: Number, default: 0 },
    neuroticism: { type: Number, default: 0 },
    openness: { type: Number, default: 0 },
  },

  reviews: [reviewSchema] 
});

userProfileSchema.pre("save", function (next) {
  if (this.dob) {
    const today = new Date();
    const birthDate = new Date(this.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.age = age;
  }
  next();
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
