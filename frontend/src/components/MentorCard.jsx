import React from "react";
import { FaUniversity } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/mentor/${mentor?.username}`);
  };

  const avatarSrc =
    mentor?.photoUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor?.name || "Mentor")}&background=6366f1&color=fff&bold=true`;

  const tags = mentor?.profile?.tags?.length ? mentor.profile.tags : ["Mentor"];

  return (
    <div
      onClick={onCardClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      {/* Image Container with Ambient Overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={avatarSrc}
          alt={`${mentor?.name || "Mentor"}'s avatar`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Floating Quick-Action Pill */}
        <div className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
          <HiOutlineArrowUpRight className="text-sm" />
        </div>

        {/* Title Badge positioned inside bottom gradient */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="inline-block text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-950/60 backdrop-blur-md border border-purple-500/30 px-2.5 py-0.5 rounded-md truncate max-w-full">
            {mentor?.profile?.title || "Industry Mentor"}
          </p>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight truncate group-hover:text-purple-600 transition-colors duration-200">
              {mentor?.name || "Verified Mentor"}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <FaUniversity className="shrink-0 text-slate-400" />
            <span className="truncate">{mentor?.profile?.college || "Educational Institution"}</span>
          </div>
        </div>

        {/* Skill / Specialty Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100/90 rounded-md border border-slate-200/60 transition-colors group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-200"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-50 rounded-md border border-slate-100">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;