import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  courseId: String,
  day: Number,

  mcq: [
    {
      question: String,
      options: [String],
      answer: Number,
    },
  ],

  coding: [
    {
      question: String,
      starterCode: String,
    },
  ],
});

export default mongoose.model("Test", TestSchema);
