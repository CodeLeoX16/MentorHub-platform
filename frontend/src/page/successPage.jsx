import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { HiCheckCircle, HiHome } from "react-icons/hi2";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[75vh] px-4 text-center">
        <div className="max-w-md w-full p-8 sm:p-10 bg-white border border-slate-200/85 rounded-3xl shadow-xl space-y-6">
          
          {/* Success Checkmark Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto shadow-inner border border-emerald-100">
            <HiCheckCircle size={40} />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Booking Confirmed!
            </h1>
            <p className="text-sm font-medium text-purple-600">
              Thank you for booking your session.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              Your meeting link and details have been successfully shared to your registered email address.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3.5 px-6 font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-xl shadow-lg shadow-purple-600/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <HiHome className="text-lg" />
            <span>Back to Homepage</span>
          </button>

        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;