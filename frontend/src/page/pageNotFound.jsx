import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { HiHome, HiExclamationTriangle } from "react-icons/hi2";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
        <div className="max-w-md w-full p-8 bg-white border border-slate-200/80 rounded-3xl shadow-xl space-y-6">
          
          {/* Warning Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 mx-auto shadow-inner">
            <HiExclamationTriangle size={32} />
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 tracking-tight">
              404
            </h1>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Oops! Page not found.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              It looks like the page you are looking for doesn't exist or has been moved. Head back to the homepage to continue browsing.
            </p>
          </div>

          <button
            type="button"
            onClick={goHome}
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

export default PageNotFound;