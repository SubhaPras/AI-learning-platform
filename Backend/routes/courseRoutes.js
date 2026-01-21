import express from "express";
import {
  requestCourse,
  getMyCourses,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected routes (requires authentication)
router.post("/request", protect, requestCourse);
router.get("/my/courses", protect, getMyCourses);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

export default router;