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
      className="transition bg-white border rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative group aspect-[4/3] overflow-hidden rounded-t-xl">
        <img
          src={
            mentor?.photoUrl ||
            `https://ui-avatars.com/api?name=${mentor?.name}`
          }
          alt={`${mentor?.name}'s avatar`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full p-3 text-center text-white">
          <h4 className="text-lg font-semibold truncate">
            {mentor?.profile?.title || "Title"}
          </h4>
        </div>
      </div>
      <div className="p-4 space-y-2">
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
              className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full"
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
