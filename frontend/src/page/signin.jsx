import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import auth from "../apiManger/auth";
import useUserStore from "../store/user";
import { setToken } from "../helper";
import { Spin } from "antd";
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();

  // Initialize useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      // Send the login data to the backend API
      const response = await auth.signin(data);
      reset();
      setUser(response.data.user);
      
      // backend returns { tokens: { access: { token } } }
      const accessToken = response.data.tokens?.access?.token || response.data.token;
      setToken(accessToken);

      // Navigate based on role after successful login
      if (response.data.user?.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/");
      }
      toast.success("Login successful!");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(error?.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="bg-white">
      <div className="flex justify-center min-h-screen">
        
        {/* Left Image Background Column */}
        <div className="hidden bg-[url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover lg:block lg:w-2/3 relative">
          <div className="absolute inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-[2px]" />
          <div className="relative flex items-center w-full h-full px-20 z-10">
            <div className="space-y-3 max-w-xl">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                MentorHub
              </h2>
              <p className="text-slate-200 text-lg leading-relaxed">
                Welcome back! Sign in to continue accessing MentorHub services.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="flex items-center w-full max-w-md px-6 py-12 mx-auto lg:w-2/6">
          <div className="flex-1 w-full space-y-6">
            
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Sign In</h1>
              <p className="text-sm text-slate-500">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={onSubmit} className="space-y-4">
                
                {/* Email Field */}
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                      <HiEnvelope size={18} />
                    </span>
                    <input
                      type="email"
                      id="email"
                      className={`block w-full h-11 pl-11 pr-4 text-sm text-slate-900 bg-white border ${
                        errors.email ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/30"
                      } rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 shadow-sm`}
                      placeholder="example@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-500 font-medium pl-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                      <HiLockClosed size={18} />
                    </span>
                    <input
                      type="password"
                      id="password"
                      className={`block w-full h-11 pl-11 pr-4 text-sm text-slate-900 bg-white border ${
                        errors.password ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/30"
                      } rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 shadow-sm`}
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters long",
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-500 font-medium pl-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    disabled={isLoading}
                    className={`w-full h-12 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      isLoading
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-purple-600/25 hover:brightness-110 active:scale-[0.98]"
                    }`}
                  >
                    {isLoading ? <Spin size="small" /> : "Sign in"}
                  </button>
                </div>
              </form>

              <div className="mt-6 space-y-2 text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
                <p>
                  Don't have an account yet?{" "}
                  <NavLink
                    to="/signup/student"
                    className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                  >
                    Sign up
                  </NavLink>
                </p>
                <p>
                  Become a{" "}
                  <NavLink
                    to="/signup/mentor"
                    className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                  >
                    Mentor
                  </NavLink>{" "}
                  with us.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;