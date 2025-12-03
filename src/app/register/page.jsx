"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import axiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call API to register user
      const { data } = await axiosInstance.post("/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success("Account created successfully!");

        // Auto-login after registration
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.ok) {
          window.location.href = "/"; // redirect to home
        } else {
          toast.error("Auto login failed!");
        }
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      toast.error("Register failed!");
    } finally {
      setIsLoading(false);
    }
  };

  //  Placeholder for Google Register (future integration)
  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden mt-8">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gray-150 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl border border-gray-200 transform transition-all duration-500 hover:scale-105">
          {/* Logo + Title */}
          <div className="text-center mb-3 sm:mb-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl mb-2 shadow-lg">
              <FaBoxOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">
              Transify
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Create your account to get started
            </p>
          </div>

          {/* Register Form */}
          <div className="space-y-2 sm:space-y-3">
            {/* Name Input */}
            <div className="relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full pl-7 sm:pl-9 pr-3 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            {/* Email Input */}
            <div className="relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-7 sm:pl-9 pr-3 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            {/* Password Input */}
            <div className="relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-7 sm:pl-9 pr-8 sm:pr-9 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-black hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </button>
            </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                  <span className="ml-2 text-xs sm:text-sm">Creating...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-2 sm:my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 sm:px-3 bg-white/90 text-gray-600">or</span>
            </div>
          </div>

          {/* Google Register Button */}
          <button
            onClick={handleGoogleRegister}
            className="w-full py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-xs sm:text-sm">Sign up with Google</span>
          </button>

          {/* Already have account */}
          <div className="text-center mt-2 sm:mt-3">
            <p className="text-gray-600 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
