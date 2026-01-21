import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Github } from "lucide-react";
import {} from "react-icons";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password },
          { withCredentials: true },
        );
        if (response.data.success) {
          toast.success("login Success");
          navigate("/dashboard")
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            {/* Remember / Forgot */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="link-button">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn">
              Sign In
            </button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            {/* OAuth */}
            <div className="oauth-buttons">
              <button type="button" className="oauth-btn">
                Google
              </button>
              <button type="button" className="oauth-btn">
                <Github strokeWidth={1} /> GitHub
              </button>
            </div>

            <p className="signup-text">
              Don’t have an account?
              <button type="button" className="link-button" onClick={()=> navigate("/register")}>
                Sign up for free
              </button>
            </p>
          </form>
        </div>

        <p className="footer-text">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
