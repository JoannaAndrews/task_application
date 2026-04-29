import { useState } from "react";
import { signupStyles } from "../assets/dummyStyles.js";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import type { SignUpProps, FormErrors } from "../types/index.ts";

const SignUp = ({ onSignUp, API_URL = "http://localhost:3001" }: SignUpProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/user/register`,
        { name, email, password, confirmPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      const { idToken, uid, name: userName, email: userEmail } = res.data.data;
      onSignUp({ uid, name: userName, email: userEmail }, idToken);

      // After registration, log the user in to get a token
      navigate("/login");

    } catch (err: any) {
      console.error("Signup error: ", err?.response || err);
      if (err.response?.data?.message) {
        setErrors({ api: err.response.data.message });
      } else {
        setErrors({ api: err.message || "An unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <img className="background-img" src="/cloud_bg.png"></img>

      <div className="card-container">
        <div className="login-header">
          <button onClick={() => navigate(-1)} className={signupStyles.backButton}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className={signupStyles.headerTitle}>Create Account</h1>
        </div>

        <div className={signupStyles.formContainer}>
          {errors.api && (
            <p className={signupStyles.apiError}>{errors.api}</p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="login-label">Full Name</label>
              <div className="login-input-container">
                <input type="text" id="name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`password-input ${errors.name ? "border-red-300" : "border-gray-200"}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className={signupStyles.fieldError}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="login-label">Email</label>
              <div className="login-input-container">
                <input type="email" id="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`password-input ${errors.email ? "border-red-300" : "border-gray-200"}`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className={signupStyles.fieldError}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="login-label"> Password</label>
              <div className="login-input-container">
                <input type={showPassword ? "text" : "password"} id="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`password-input ${errors.password ? "border-red-300" : "border-gray-200"}`}
                  placeholder="Your password here"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className={signupStyles.fieldError}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
              <div className="login-input-container">
                <input type="password" id="confirmPassword" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`password-input ${errors.confirmPassword ? "border-red-300" : "border-gray-200"}`}
                  placeholder="Repeat your password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className={signupStyles.fieldError}>{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className={`${signupStyles.button} ${isLoading ? signupStyles.buttonDisabled : ""}`}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className={signupStyles.signInContainer}>
            <p className={signupStyles.signInText}>
              Already have an account?{" "}
              <Link to="/login" className={signupStyles.signInLink}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;