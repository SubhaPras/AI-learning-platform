import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String, 
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/  // Basic email validation
  },
  password: {
    type: String, 
    default: null,
    minlength: 6  // If you're storing hashed passwords
  },

  enrolledCourses: [
    {
      courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course',  // This links to Course model
        required: true
      },
      progress: { 
        type: Number, 
        default: 0,
        min: 0,
        max: 100
      },
      enrolledAt: {
        type: Date,
        default: Date.now
      }
    },
  ],
}, { 
  timestamps: true 
});

// Email index is automatic due to unique, but good to be explicit
UserSchema.index({ email: 1 });

export default mongoose.model("User", UserSchema);