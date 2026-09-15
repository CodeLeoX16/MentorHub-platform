import React, { useEffect, useState, useMemo } from "react";
import { Spin } from "antd";
import useMentorStore from "../store/mentors";
import MentorCard from "../components/MentorCard";
import mentorAPI from "../apiManger/mentor";
import Layout from "../components/Layout";
import { HiMagnifyingGlass, HiOutlineUserGroup } from "react-icons/hi2";

const AllMentors = () => {
  const { mentorsData, setMentorsData } = useMentorStore();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch mentors when the component mounts if mentorsData is empty
  useEffect(() => {
    const fetchAllMentors = async () => {
      setLoading(true);
      try {
        const response = await mentorAPI.getAllMentors();
        const allMentors = response?.data?.mentors || [];
        setMentorsData(allMentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mentorsData.length === 0) {
      fetchAllMentors();
    }
  }, [mentorsData, setMentorsData]);

  // Filter mentors based on search query (name, title, college, or tags)
  const filteredMentors = useMemo(() => {
    if (!searchQuery.trim()) return mentorsData;
    const query = searchQuery.toLowerCase();
    return mentorsData.filter((mentor) => {
      const name = mentor?.name?.toLowerCase() || "";
      const title = mentor?.profile?.title?.toLowerCase() || "";
      const college = mentor?.profile?.college?.toLowerCase() || "";
      const tags = mentor?.profile?.tags?.join(" ").toLowerCase() || "";
      return name.includes(query) || title.includes(query) || college.includes(query) || tags.includes(query);
    });
  }, [mentorsData, searchQuery]);

  return (
    <Layout>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md">
            <HiOutlineUserGroup className="text-sm" /> Verified Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Book Your Session Now
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Explore our curated list of verified industry experts and schedule your 1-on-1 mentorship call.
          </p>
        </div>

        {/* Modern Search Bar */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <HiMagnifyingGlass size={20} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, expertise, tech stack, or college..."
              className="w-full h-12 pl-11 pr-4 text-sm text-slate-900 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Loading State Skeleton Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
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
          /* Mentors Grid Display */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <MentorCard key={mentor?._id} mentor={mentor} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center space-y-3 bg-white border border-slate-200/80 rounded-2xl">
                <p className="text-slate-600 font-medium">No mentors match your search criteria.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 text-xs font-semibold text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  Clear search filter
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default AllMentors;