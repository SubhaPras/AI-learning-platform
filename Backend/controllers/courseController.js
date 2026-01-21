import Course from "../models/courseModel.js";

export const requestCourse = async (req, res) => {
  try {
    const { topic, duration } = req.body;

    
    if (!topic || !duration) {
      return res.status(400).json({
        success: false,
        message: "Topic and duration are required",
      });
    }

  
    if (isNaN(duration) || duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be a positive number",
      });
    }

   
    const course = await Course.create({
      title: topic,
      topic,
      duration,
      createdBy: req.user._id,
    });

    
    await course.populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Course request created successfully",
      course,
    });
  } catch (error) {
    console.error("Request course error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A course with this topic already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating course request",
    });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    
    const userId = req.user._id;

    const courses = await Course.find({ createdBy: userId })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get my courses error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      topic,
      duration,
    } = req.query;

    const query = {};
    if (topic) {
      query.topic = { $regex: topic, $options: "i" }; // Case-insensitive search
    }
    if (duration) {
      query.duration = duration;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const courses = await Course.find(query)
      .populate("createdBy", "name email")
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      courses,
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course by ID error:", error);

    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while fetching course",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, duration, title } = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }


    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this course",
      });
    }

    
    if (topic) course.topic = topic;
    if (duration) course.duration = duration;
    if (title) course.title = title;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update course error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating course",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Find course
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if user is the creator
    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this course",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while deleting course",
    });
  }
};