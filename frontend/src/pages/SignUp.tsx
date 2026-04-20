import { useState } from "react";
import { signupStyles } from "../assets/dummyStyles.js";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
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
    <div className={signupStyles.pageContainer}>
      <div className={signupStyles.cardContainer}>
        <div className={signupStyles.header}>
          <button onClick={() => navigate(-1)} className={signupStyles.backButton}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className={signupStyles.avatar}>
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className={signupStyles.headerTitle}>Create Account</h1>
        </div>

        <div className={signupStyles.formContainer}>
          {errors.api && (
            <p className={signupStyles.apiError}>{errors.api}</p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className={signupStyles.label}>Full Name</label>
              <div className={signupStyles.inputContainer}>
                <div className={signupStyles.inputIcon}>
                  <User className="w-5 h-5" />
                </div>
                <input type="text" id="name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${signupStyles.input} ${errors.name ? "border-red-300" : "border-gray-200"}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className={signupStyles.fieldError}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className={signupStyles.label}>Email</label>
              <div className={signupStyles.inputContainer}>
                <div className={signupStyles.inputIcon}>
                  <Mail className="w-5 h-5" />
                </div>
                <input type="email" id="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${signupStyles.input} ${errors.email ? "border-red-300" : "border-gray-200"}`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className={signupStyles.fieldError}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className={signupStyles.label}>Password</label>
              <div className={signupStyles.inputContainer}>
                <div className={signupStyles.inputIcon}>
                  <Lock className="w-5 h-5" />
                </div>
                <input type={showPassword ? "text" : "password"} id="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${signupStyles.input} ${errors.password ? "border-red-300" : "border-gray-200"}`}
                  placeholder="Your password here"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className={signupStyles.passwordToggle}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className={signupStyles.fieldError}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className={signupStyles.label}>Confirm Password</label>
              <div className={signupStyles.inputContainer}>
                <div className={signupStyles.inputIcon}>
                  <Lock className="w-5 h-5" />
                </div>
                <input type="password" id="confirmPassword" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${signupStyles.input} ${errors.confirmPassword ? "border-red-300" : "border-gray-200"}`}
                  placeholder="Repeat your password"
                />
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