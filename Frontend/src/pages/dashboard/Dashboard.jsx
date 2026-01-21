import axios from "axios";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  ChevronRight,
  AlertCircle,
  Loader
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        

        const res = await axios.get("http://localhost:5000/api/course/my/courses", {withCredentials : true});

        setCourses(res.data.courses);
        setError(null);
        
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log(courses)

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-title">
            <BookOpen size={32} />
            <h1>My Courses</h1>
          </div>
          <p>Track your learning progress and continue where you left off</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="state-center">
            <Loader size={40} className="spinner" />
            <p>Loading your courses...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="error-box">
            <AlertCircle size={20} />
            <div>
              <h4>Error</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && courses.length === 0 && !error && (
          <div className="state-center">
            <BookOpen size={56} />
            <h3>No courses yet</h3>
            <p>Start learning by creating or enrolling in a course</p>
          </div>
        )}

        {/* Courses */}
        {!loading && courses.length > 0 && (
          <div className="course-grid">
            {courses.map(course => (
              <div className="course-card" key={course._id}>
                <div className="course-card-header">
                  <h3>{course.title}</h3>
                </div>

                <div className="course-card-body">
                  <div>
                    <span className="label">Topic</span>
                    <p className="value">{course.topic}</p>
                  </div>

                  <div className="duration">
                    <Clock size={18} />
                    <span>
                      {course.duration}{" "}
                      {course.duration === 1 ? "day" : "days"}
                    </span>
                  </div>

                  {course.roadmap?.length > 0 && (
                    <div className="roadmap">
                      <span className="label">Roadmap</span>
                      <div className="roadmap-info">
                        <span>
                          {course.roadmap.length}{" "}
                          {course.roadmap.length === 1
                            ? "module"
                            : "modules"}
                        </span>
                        <span className="roadmap-days">
                          Day {course.roadmap[0]?.day} -{" "}
                          {course.roadmap[course.roadmap.length - 1]?.day}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="course-card-footer">
                  <button>
                    Continue Learning
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="course-card-date">
                  Created:{" "}
                  {course.createdAt
                    ? new Date(course.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
