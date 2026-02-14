import React, { useEffect, useState, useCallback } from "react";
import MentorCard from "./MentorCard";
import mentorAPI from "../apiManger/mentor";
import useMentorStore from "../store/mentors";
import { NavLink } from "react-router-dom";
import { Button, Spin } from "antd";

const TopMentors = () => {
  const { setMentorsData } = useMentorStore();
  const [topMentors, setTopMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get 4 random mentors from the array
  const selectTopMentors = (mentors) => {
    const selected = [];
    const totalMentors = mentors.length;

    while (selected.length < 4 && selected.length < totalMentors) {
      const randomIndex = Math.floor(Math.random() * totalMentors); // Get random index
      const randomMentor = mentors[randomIndex];

      // Check if the random mentor has already been selected
      if (!selected.includes(randomMentor)) {
        selected.push(randomMentor); // Add unique mentor
      }
    }

    return selected; // Return the selected mentors
  };

  const fetchAllMentors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await mentorAPI.getAllMentors();
      const allMentors = response?.data?.mentors || [];
      setMentorsData(allMentors); // Store all mentors

      setTopMentors(selectTopMentors(allMentors)); // Set 4 random mentors directly from the API response
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
    <div className="px-4 py-12 bg-gradient-to-b from-white to-gray-50 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
          Top Mentors
        </h2>
        {loading ? (
          <div className="flex justify-center my-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topMentors.map((mentor) => {
              return <MentorCard mentor={mentor} key={mentor?._id} />;
            })}
          </div>
        )}
        <div className="mt-8 text-center">
          <NavLink to="/mentors">
            <Button type="default" className="text-blue-500 hover:text-blue-700">
              View All
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopMentors;
