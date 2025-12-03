"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert("Invalid credentials");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      router.push("/");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    await signIn("google"); // make sure Google provider is configured
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden mt-8">
      {/* Background circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gray-150 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl border border-gray-200 transform transition-all duration-500 hover:scale-105">
          {/* Logo */}
          <div className="text-center mb-3 sm:mb-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl mb-2 shadow-lg">
              <FaBoxOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">
              Transify
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Welcome back! Please sign in
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-2 sm:space-y-3">
            <div className="relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or username"
                className="w-full pl-7 sm:pl-9 pr-3 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>

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

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                  <span className="ml-2 text-xs sm:text-sm">Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-2">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-xs sm:text-sm"
            >
              Forgot password?
            </a>
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

          {/* Google Login (placeholder, provider not configured yet) */}
          <button
            type="button"
            onClick={() =>
              alert("Google login is not configured yet. Please use email & password.")
            }
            className="w-full py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm text-gray-400 font-semibold rounded-lg border border-dashed border-gray-300 cursor-not-allowed text-xs sm:text-sm"
          >
            Google login (coming soon)
          </button>

          {/* Sign up */}
          <div className="text-center mt-2 sm:mt-3">
            <p className="text-gray-600 text-xs sm:text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-semibold"
              >
                Sign up
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

export default LoginPage;
