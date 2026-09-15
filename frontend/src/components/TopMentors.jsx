import React, { useEffect, useState, useCallback } from "react";
import MentorCard from "./MentorCard";
import mentorAPI from "../apiManger/mentor";
import useMentorStore from "../store/mentors";
import { Spin } from "antd";

const TopMentors = () => {
  const { setMentorsData } = useMentorStore();
  const [topMentors, setTopMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get 4 random mentors from the array
  const selectTopMentors = (mentors) => {
    const selected = [];
    const totalMentors = mentors.length;

    while (selected.length < 4 && selected.length < totalMentors) {
      const randomIndex = Math.floor(Math.random() * totalMentors);
      const randomMentor = mentors[randomIndex];

      if (!selected.includes(randomMentor)) {
        selected.push(randomMentor);
      }
    }

    return selected;
  };

  const fetchAllMentors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await mentorAPI.getAllMentors();
      const allMentors = response?.data?.mentors || [];
      setMentorsData(allMentors);

      setTopMentors(selectTopMentors(allMentors));
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  }, [setMentorsData]);

  useEffect(() => {
    fetchAllMentors();
  }, [fetchAllMentors]);

  return (
    <div className="w-full">
      {/* Loading Skeleton State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-slate-200 p-4 h-80 animate-pulse flex flex-col justify-between">
              <div className="bg-slate-200 h-44 rounded-xl w-full" />
              <div className="space-y-2 py-2">
                <div className="bg-slate-200 h-4 rounded w-3/4" />
                <div className="bg-slate-200 h-3 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Mentors Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topMentors.map((mentor) => (
            <MentorCard mentor={mentor} key={mentor?._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopMentors;