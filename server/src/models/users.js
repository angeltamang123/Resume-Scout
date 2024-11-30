const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  dateOfBirth: { type: Date },
  highestQualification: { type: String },
  yearsOfExperience: { type: Number, default: 0 },
  preferredJobRole: { type: String },
  linkedInProfile: { type: String },
  gitHubProfile: { type: String },
  resume: { type: String }, // Stores file path or file name
  skills: [{ type: String }], // Array of skills
  coverLetter: { type: String },
  availability: {
    type: String,
    enum: ["Full-time", "Part-time", "Freelance"],
    default: "Full-time",
  },
  relocationPreferences: { type: String },
  portfolioURL: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Register = mongoose.model("Register", registrationSchema);

module.exports = Register;
