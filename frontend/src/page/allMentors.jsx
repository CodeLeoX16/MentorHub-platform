import React, { useEffect, useState } from "react";
import { Spin } from "antd"; // Import the Spin component from antd
import useMentorStore from "../store/mentors";
import MentorCard from "../components/MentorCard";
import mentorAPI from "../apiManger/mentor";
import DashboardNavbar from "../components/DashboardNavbar";
import Layout from "../components/Layout";

const AllMentors = () => {
  const { mentorsData, setMentorsData } = useMentorStore();
  const [loading, setLoading] = useState(false); // State for tracking loading status

  // Fetch mentors when the component mounts if mentorsData is empty
  useEffect(() => {
    const fetchAllMentors = async () => {
      setLoading(true); // Start loading
      try {
        const response = await mentorAPI.getAllMentors();
        const allMentors = response?.data?.mentors || [];
        setMentorsData(allMentors); // Store all mentors in the Zustand store
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false); // Stop loading once the request completes
      }
    };

    if (mentorsData.length === 0) {
      fetchAllMentors();
    }
  }, [mentorsData, setMentorsData]);

  return (
    <Layout>
      <div className="px-4 py-10 mx-auto max-w-6xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
          Book Your Session Now
        </h2>

        <div className="flex justify-center mb-10">
          <input
            className="w-full max-w-xl p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            type="text"
            placeholder="Search mentors..."
          />
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center my-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mentorsData.length > 0 ? (
              mentorsData.map((mentor) => (
                <MentorCard key={mentor?._id} mentor={mentor} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No mentors available.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllMentors;
