import { useState } from "react";
import { loginStyles } from "../assets/dummyStyles.js";
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link } from "react-router";
import axios from "axios";
import type { LoginProps } from "../types/index.ts";

const Login = ({ onLogin, API_URL = "http://localhost:3001" }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { idToken, uid, name, email: userEmail } = res.data.data;
      onLogin({ uid, name, email: userEmail }, idToken);
      setPassword("");

    } catch (err: any) {
      console.error("Login error:", err?.response || err);
      const serverMsg =
        err.response?.data?.message || err.message || "Login failed";
      setError(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <img className="background-img" src="/cloud_bg.png"></img>

      <div className="card-container">
        <div className="login-header">
          <div className="avatar">
            <User className="person-icon" />
          </div>
          <h1 className="login-header-title">Welcome back</h1>
          <p className="login-header-subtitle">
            Sign in to your account
          </p>
        </div>

        <div className="login-form-container">
          {error && (
            <div className="login-error-container">
              <span className="error-text">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-styles">
              <label htmlFor="email" className="login-label">
                Email Address
              </label>
              <div className="login-input-container">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@example.com"
                  className="password-input"
                  required
                />
                <div className="input-icon">
                  <Mail className="w-5 h-5" />
                </div>
              </div>

              <label htmlFor="password" className="login-label">
                Password
              </label>
              <div className="login-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                  placeholder="your password"
                  required
                />
                <div className="input-icon">
                  <Lock className="w-5 h-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`${loginStyles.button} ${isLoading ? loginStyles.buttonDisabled : ""}`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className={loginStyles.signUpContainer}>
            <p className={loginStyles.signUpText}>
              Don't have an account?{" "}
            </p>
            <Link to='/signup' className={loginStyles.signUpLink}>
              Create One
            </Link>
          </div>
        </div>
      </div>
      <img className="background-img" src="/cloud_bg.png"></img>
    </div>
  );
};

export default Login;