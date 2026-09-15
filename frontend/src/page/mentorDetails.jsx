import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mentorAPI from "../apiManger/mentor";
import { Spin } from "antd";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import ServiceCardUserSide from "../components/ServiceCardUserSide";
import Layout from "../components/Layout";
import { BiErrorAlt } from "react-icons/bi";
import { HiOutlineUser, HiSparkles } from "react-icons/hi2";

const MentorDetails = () => {
  const { username } = useParams();
  const [mentor, setMentor] = useState(null);
  const [services, setServices] = useState([]);
  const [mentorLoading, setMentorLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        setMentorLoading(true);
        setServicesLoading(true);
        const response = await mentorAPI.getMentorByUsername(username);
        setMentor(response?.data?.mentor);
        setServices(response?.data?.services || []);
      } catch (error) {
        console.error("Error fetching mentor details:", error);
      } finally {
        setMentorLoading(false);
        setServicesLoading(false);
      }
    };

    if (username) {
      fetchMentorDetails();
    }
  }, [username]);

  return (
    <Layout>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mentor's Profile Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            {mentorLoading ? (
              <div className="flex items-center justify-center py-20">
                <Spin size="large" />
              </div>
            ) : mentor ? (
              <>
                {/* Avatar & Title */}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={
                        mentor?.photoUrl ||
                        `https://ui-avatars.com/api?name=${encodeURIComponent(mentor?.name || "Mentor")}&background=6366f1&color=fff&bold=true`
                      }
                      alt={`${mentor?.name || "Mentor"}'s avatar`}
                      className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-purple-100 shadow-lg"
                    />
                    <span className="absolute bottom-1 right-1 p-1.5 bg-purple-600 text-white rounded-full shadow">
                      <HiSparkles size={14} />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {mentor?.name || "Verified Mentor"}
                    </h2>
                    <p className="text-sm font-medium text-purple-600">
                      {mentor?.profile?.title || "Industry Specialist"}
                    </p>
                  </div>
                </div>

                {/* Skills / Tags */}
                {mentor?.profile?.tags && mentor.profile.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {mentor.profile.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100/80 border border-slate-200/60 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bio Section */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed text-center">
                    {mentor?.profile?.bio || "No biography provided yet."}
                  </p>
                </div>

                {/* Social Connect Links */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                    Connect with me
                  </h3>
                  <div className="flex justify-center items-center gap-4 text-slate-600">
                    {mentor?.profile?.social?.linkedin && (
                      <a href={mentor.profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                        <AiFillLinkedin className="text-xl" />
                      </a>
                    )}
                    {mentor?.profile?.social?.github && (
                      <a href={mentor.profile.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors">
                        <AiFillGithub className="text-xl" />
                      </a>
                    )}
                    {mentor?.profile?.social?.twitter && (
                      <a href={mentor.profile.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-colors">
                        <AiFillTwitterCircle className="text-xl" />
                      </a>
                    )}
                    {mentor?.profile?.social?.facebook && (
                      <a href={mentor.profile.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors">
                        <AiFillFacebook className="text-xl" />
                      </a>
                    )}
                    {mentor?.profile?.social?.instagram && (
                      <a href={mentor.profile.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-colors">
                        <AiFillInstagram className="text-xl" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <p>Mentor profile not found.</p>
              </div>
            )}
          </div>

          {/* Right Column: Mentor's Services & Booking Section */}
          <div className="lg:col-span-8 bg-slate-50/50 rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Book a Session
              </h3>
              <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                {services.length} Available
              </span>
            </div>

            {servicesLoading ? (
              <div className="flex items-center justify-center py-16">
                <Spin size="large" />
              </div>
            ) : services && services.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <ServiceCardUserSide
                    username={mentor?.username}
                    service={service}
                    key={service?._id}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-600 bg-white border border-slate-200/80 rounded-2xl space-y-3">
                <BiErrorAlt className="w-16 h-16 text-purple-500" />
                <h4 className="text-lg font-bold text-slate-900">
                  No Services Available
                </h4>
                <p className="text-sm text-slate-500 max-w-sm text-center">
                  This mentor hasn't published any active booking services right now. Please check back later!
                </p>
                <button
                  className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 rounded-xl shadow-md hover:bg-purple-700 transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default MentorDetails;