import React from "react";
import { FaPhone, FaEdit } from "react-icons/fa";

const ServiceCard = ({ service, onEdit, onToggleActive }) => {
  return (
    <div className="group relative bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Header: Service Icon, Name & Status Pill */}
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
            <FaPhone size={18} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight truncate">
            {service?.name || "Untitled Service"}
          </h3>
        </div>

        {/* Enable / Disable Badge Button */}
        <button
          onClick={onToggleActive}
          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm ${
            service?.active
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
              : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
          }`}
        >
          {service?.active ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Service Description */}
      <p className="text-sm text-slate-600 mb-5 line-clamp-2 leading-relaxed">
        {service?.description || "No description provided for this service."}
      </p>

      {/* Pricing and Duration Grid Bar */}
      <div className="flex items-center justify-between px-4 py-3 mb-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-normal text-slate-500">Price:</span>
          <span className="text-purple-600 font-bold">₹{service?.price || 0}</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-normal text-slate-500">Duration:</span>
          <span>{service?.duration || 0} mins</span>
        </div>
      </div>

      {/* Action Footer: Edit Button */}
      <div className="flex items-center justify-end pt-2 border-t border-slate-100">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-600 bg-slate-100/80 hover:bg-purple-50 px-3.5 py-2 rounded-xl transition-all duration-200"
        >
          <FaEdit size={14} className="text-slate-500 group-hover:text-purple-600" />
          <span>Edit Service</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;