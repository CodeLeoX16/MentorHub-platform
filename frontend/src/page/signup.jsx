import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import auth from "../apiManger/auth";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { HiUser, HiEnvelope, HiLockClosed, HiAtSymbol } from "react-icons/hi2";

const SignUp = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const heading = role === "mentor" ? "Sign Up as Mentor" : "Sign Up as Student";

  // Initialize useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      ...data,
      role,
    };
    try {
      await auth.signup(formData);
      reset();
      toast.success("Account created successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error?.response?.data?.message || "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center min-h-screen">
        
        {/* Left Image Background Column */}
        <div className="hidden bg-[url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover lg:block lg:w-2/3 relative">
          <div className="absolute inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-[2px]" />
          <div className="relative flex items-center w-full h-full px-20 z-10">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                MentorHub
              </h2>
              <p className="text-slate-200 text-lg leading-relaxed">
                {role === "mentor"
                  ? "Join MentorHub as a Mentor and start helping students achieve their career goals."
                  : "Create your student account to start learning with our best mentors."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="flex items-center w-full max-w-md px-6 py-12 mx-auto lg:w-2/6">
          <div className="flex-1 w-full space-y-6">
            
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">{heading}</h1>
              <p className="text-sm text-slate-500">
                Sign up to create your account
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                      <HiUser size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`block w-full h-11 pl-11 pr-4 text-sm text-slate-900 bg-white border ${
                        errors.name ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/30"
                      } rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 shadow-sm`}
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-rose-500 font-medium pl-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                      <HiEnvelope size={18} />
                    </span>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className={`block w-full h-11 pl-11 pr-4 text-sm text-slate-900 bg-white border ${
                        errors.email ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/30"
                      } rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 shadow-sm`}
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

                {/* Username Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                      <HiAtSymbol size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="Username"
                      className={`block w-full h-11 pl-11 pr-4 text-sm text-slate-900 bg-white border ${
                        errors.username ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/30"
                      } rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 shadow-sm`}
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 4,
                          message: "Username must be at least 4 characters long",
                        },
                      })}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-xs text-rose-500 font-medium pl-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                      <HiLockClosed size={18} />
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      className={`block w-full h-11 pl-11 pr-4 text-sm text-slate-900 bg-white border ${
                        errors.password ? "border-rose-500 focus:ring-rose-500/30" : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/30"
                      } rounded-xl focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 shadow-sm`}
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
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-12 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      isLoading
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-purple-600/25 hover:brightness-110 active:scale-[0.98]"
                    }`}
                  >
                    {isLoading ? <Spin size="small" /> : "Sign Up"}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-slate-500 pt-2 border-t border-slate-100">
                Already have an account?{" "}
                <NavLink
                  to="/signin"
                  className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Sign In
                </NavLink>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;