import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  topic: { 
    type: String, 
    required: true,
    trim: true
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1,
    max: 365  // or whatever makes sense
  },

  roadmap: [
    {
      day: { 
        type: Number, 
        required: true,
        min: 1
      },
      title: { 
        type: String, 
        required: true,
        trim: true
      },
      topics: [{ 
        type: String,
        trim: true
      }],
      resources: [{ 
        type: String,
        trim: true
      }],
      testId: { 
        type: String,
        trim: true
      },
    },
  ],

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // This links to User model
    required: true
  },
}, { 
  timestamps: true  // Adds createdAt and updatedAt
});

// Add indexes for common queries
CourseSchema.index({ topic: 1 });
CourseSchema.index({ createdBy: 1 });

export default mongoose.model("Course", CourseSchema);