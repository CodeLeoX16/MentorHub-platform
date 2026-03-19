import React from "react";
import { FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle card click
  const onCardClick = () => {
    // Navigate to MentorDetails page, passing the username
    navigate(`/mentor/${mentor?.username}`);
  };

  return (
    <div
      onClick={onCardClick}
      className="transition bg-white/60 border border-white/30 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl hover:-translate-y-1 backdrop-blur-lg glass-card group duration-200 ease-in-out relative overflow-hidden animate-fade-in-up"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
    >
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-white/10 to-indigo-200/20 pointer-events-none z-0 rounded-2xl" />
      <div className="relative group aspect-[4/3] overflow-hidden rounded-t-2xl z-10">
        <img
          src={
            mentor?.photoUrl ||
            `https://ui-avatars.com/api?name=${mentor?.name}`
          }
          alt={`${mentor?.name}'s avatar`}
          className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full p-3 text-center text-white">
          <h4 className="text-lg font-semibold truncate drop-shadow-lg">
            {mentor?.profile?.title || "Title"}
          </h4>
        </div>
      </div>
      <div className="p-4 space-y-2 z-10 relative">
        <div>
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {mentor?.name || "Name"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaUniversity className="shrink-0" />
            <p className="truncate">{mentor?.profile?.college || "College"}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(mentor?.profile?.tags || ["Mentor"]).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-semibold text-gray-700 bg-white/70 backdrop-blur-sm rounded-full border border-purple-200/40 shadow-sm hover:bg-purple-100/80 transition"
            >
              {tag || "Tag"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
