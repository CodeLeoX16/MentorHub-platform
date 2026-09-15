import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineVideoCamera, HiCurrencyRupee, HiArrowRight } from "react-icons/hi2";

const ServiceCardUserSide = ({ service, username }) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/mentor/${username}/${service?._id}`);
  };

  return (
    <div
      onClick={onCardClick}
      className="group relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Service Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors tracking-tight mb-4">
          {service?.name || "Mentorship Session"}
        </h3>

        {/* Inner Details Container */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-purple-50/40 group-hover:border-purple-100 transition-all">
          
          {/* Duration & Type */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl text-purple-600 shadow-sm">
              <HiOutlineVideoCamera size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{service?.duration || 30} mins</p>
              <p className="text-xs text-slate-500 font-medium">1-on-1 Video Meeting</p>
            </div>
          </div>

          {/* Pricing & Booking CTA Button Pill */}
          <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 shadow-sm transition-all duration-200">
            <span className="flex items-center">
              <HiCurrencyRupee className="text-base mr-0.5" />
              {service?.price || 0}
            </span>
            <HiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceCardUserSide;