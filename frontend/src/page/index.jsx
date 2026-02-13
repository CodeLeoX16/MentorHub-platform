import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import heroVideo from "../assets/hero.mp4";
import star from "../assets/star.png";
import trophy from "../assets/trophy.png";
import diamond from "../assets/diamond.png";
import computerchip from "../assets/computer-chip.png";
import graduated from "../assets/graduated.png";
import coding from "../assets/coding.png";
import TopMentors from "../components/TopMentors";
import { Nav } from "../components/Nav";

const Home = () => {
  const [isOpen, setIsOpen] = useState({});

  const toggleFAQ = (index) => {
    setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <Nav />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
          <img className="hidden w-14 md:block absolute top-10 left-[12%]" src={star} alt="" />
          <img className="hidden w-14 md:block absolute top-[18%] left-48" src={graduated} alt="" />
          <img className="hidden w-20 md:block absolute top-16 right-[12%]" src={diamond} alt="" />

          <div className="max-w-6xl px-4 py-14 mx-auto md:py-20">
            <div className="flex flex-col items-center text-center gap-6 md:gap-8">
              <h1 className="text-3xl font-extrabold md:text-6xl lg:text-7xl">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-300">MentorHub</span>
              </h1>
              <p className="max-w-2xl text-sm text-gray-200 md:text-lg lg:text-xl">
                Unlock your potential with the guidance of expert mentors.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <NavLink to="/mentors">
                  <button className="px-7 py-3 text-sm font-semibold text-white transition rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-xl">
                    Find Your Mentor
                  </button>
                </NavLink>
                <NavLink to="/signup/mentor">
                  <button className="px-7 py-3 text-sm font-semibold text-gray-900 transition bg-white rounded-full shadow hover:shadow-lg">
                    Become a Mentor
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="relative mt-10 md:mt-14">
              <img className="hidden w-14 md:block absolute top-24 left-4" src={coding} alt="" />
              <img className="hidden w-14 md:block absolute top-3 right-8" src={trophy} alt="" />
              <div className="overflow-hidden bg-black/40 border border-white/10 shadow-2xl rounded-2xl">
                <video autoPlay loop muted className="object-cover w-full h-full">
                  <source src={heroVideo} type="video/mp4" />
                </video>
              </div>
              <img className="hidden w-14 md:block absolute -bottom-10 right-10" src={star} alt="" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-[#F5EEE9]">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col max-w-screen-xl overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
              <div className="relative lg:w-1/2">
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Mentorship"
                  className="object-cover w-full lg:absolute h-80 lg:h-full"
                />
                <svg className="absolute top-0 right-0 hidden h-full text-white lg:inline-block" viewBox="0 0 20 104" fill="currentColor">
                  <polygon points="17.3036738 0 20 0 20 104 0.824555778 104" />
                </svg>
              </div>
              <div className="p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
                <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">What is MentorHub?</h5>
                <p className="mb-5 text-gray-800">
                  <span className="font-bold">MentorHub</span> is a platform designed to connect students and professionals with mentors who can guide them through their personal and professional development.
                </p>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded shadow-md hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                  >
                    Get started
                  </button>
                  <a
                    href="/"
                    aria-label="Learn more"
                    className="inline-flex items-center font-semibold text-purple-600 transition-colors duration-200 hover:text-purple-800"
                  >
                    Learn More
                    <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 py-20 bg-white">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern id="ea469ae8-e6ec-4aca-8875-fc402da4d16e" x="0" y="0" width=".135" height=".30">
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)" width="52" height="24" />
                  </svg>
                </span>{" "}
                Empowering You with Tailored Mentorship
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                At MentorHub, we connect you with expert mentors who understand your unique needs and learning goals. Whether you're looking to advance in your career, gain a new skill, or find direction, our platform provides personalized guidance to help you succeed.
              </p>
            </div>
            <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
              {["Expert Mentorship", "Tailored Learning Paths", "Flexible Scheduling", "Goal-Oriented Sessions", "Mentor Reviews & Ratings", "Seamless Onboarding"].map((title) => (
                <div key={title} className="max-w-md p-5 bg-white border rounded shadow-sm sm:mx-auto sm:text-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                    <svg className="w-12 h-12 text-purple-600 sm:w-16 sm:h-16" stroke="currentColor" viewBox="0 0 52 52">
                      <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23" />
                    </svg>
                  </div>
                  <h6 className="mb-3 text-xl font-bold leading-5">{title}</h6>
                  <p className="mb-3 text-sm text-gray-900">
                    {title === "Expert Mentorship" && "Get one-on-one guidance from seasoned professionals."}
                    {title === "Tailored Learning Paths" && "Choose mentors that align to your goals and style."}
                    {title === "Flexible Scheduling" && "Set sessions around your availability so learning fits your life."}
                    {title === "Goal-Oriented Sessions" && "Every meeting focuses on tangible outcomes and real progress."}
                    {title === "Mentor Reviews & Ratings" && "Browse trusted feedback to find the mentor who matches how you learn."}
                    {title === "Seamless Onboarding" && "Create an account, browse mentors, and schedule in minutes."}
                  </p>
                  <a href="/" aria-label="Learn more" className="inline-flex items-center font-semibold text-purple-400 transition-colors duration-200 hover:text-purple-800">
                    Learn more
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section (timeline style) */}
        <section className="bg-white">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="lg:pr-10">
                <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                  Start mentoring in minutes
                </h2>
                <p className="mb-6 text-gray-700">Follow these steps to get started with your mentor and begin your learning journey.</p>
                {[{
                  title: "Sign Up",
                  body: "Start the journey by creating a profile."
                }, {
                  title: "Browse Mentors",
                  body: "Search and explore mentors based on your specific needs."
                }, {
                  title: "Select Your Mentor",
                  body: "Check mentor profiles and reviews to find the perfect fit."
                }, {
                  title: "Book a Session",
                  body: "Schedule sessions at a time that works for you."
                }, {
                  title: "Start Learning",
                  body: "Begin your customized mentorship journey and achieve your goals."
                }, {
                  title: "Success",
                  body: "Celebrate milestones with your mentor."
                }].map((step, idx) => (
                  <div className="flex" key={step.title}>
                    <div className="flex flex-col items-center mr-4">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                          <svg
                            className={idx === 5 ? "w-6 text-gray-600" : "w-4 text-gray-600"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            {idx === 5 ? (
                              <polyline fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="6,12 10,16 18,8" />
                            ) : (
                              <>
                                <line fill="none" strokeMiterlimit="10" x1="12" y1="2" x2="12" y2="22" />
                                <polyline fill="none" strokeMiterlimit="10" points="19,15 12,22 5,15" />
                              </>
                            )}
                          </svg>
                        </div>
                      </div>
                      {idx < 5 && <div className="w-px h-full bg-gray-300" />}
                    </div>
                    <div className="pt-1 pb-8 text-start">
                      <p className="mb-2 text-lg font-bold">{step.title}</p>
                      <p className="text-gray-700">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative">
                <img
                  className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                  src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="How it works"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Categories Section */}
        <section className="px-8 py-20 bg-white">
          <div className="flex flex-col px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 lg:flex-row">
            <div className="mb-5 lg:w-1/3 lg:mb-0 lg:mr-20">
              <h2 className="relative mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern id="6bfa0e57-faa2-4bb2-ac0e-310782e5eb2d" x="0" y="0" width=".135" height=".30">
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect fill="url(#6bfa0e57-faa2-4bb2-ac0e-310782e5eb2d)" width="52" height="24" />
                  </svg>
                </span>{" "}
                Find the Perfect Mentor for Your Journey
              </h2>
              <p className="mb-4 text-gray-900 lg:mb-6">
                Explore a wide range of mentor categories to find the perfect match for your personal or professional growth. Our mentors are ready to guide you in mastering new skills, overcoming challenges, and achieving your goals.
              </p>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold text-purple-400 transition-colors duration-200 hover:text-purple-800"
              >
                Learn more
                <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="flex-grow pt-1">
              <div className="flex items-center mb-3">
                <span className="font-bold tracking-wide text-gray-900">Categories</span>
                <span className="ml-1">
                  <svg className="w-5 h-5 mt-px text-purple-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23" />
                  </svg>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-40 sm:grid-cols-3">
                <ul className="space-y-4">
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Career Growth Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Skill Development Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Entrepreneurship Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Freelancing &amp; Gig Economy Mentors</a></li>
                </ul>
                <ul className="space-y-4">
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Industry-Specific Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Education &amp; Research Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Career Transition Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Marketing &amp; Growth Mentors</a></li>
                </ul>
                <ul className="space-y-4">
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Financial &amp; Investment Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Health &amp; Wellness Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Creative &amp; Design Mentors</a></li>
                  <li><a href="/" className="text-purple-400 transition-colors duration-300 hover:text-purple-700 hover:underline">Community &amp; Volunteering Mentors</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Top Mentors Section */}
        <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-white">
          <div className="flex items-center justify-between px-5 mb-8">
            <h1 className="text-2xl font-bold">Top Mentors</h1>
            <NavLink
              to="/mentors"
              className="px-5 py-1 text-lg font-semibold text-white transition bg-indigo-500 rounded-md shadow hover:bg-indigo-600"
            >
              View All
            </NavLink>
          </div>
          <TopMentors />
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-16 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-screen-lg sm:text-center sm:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl mb-6">Flexible Pricing for Every Journey</h2>
            <p className="text-base text-indigo-100 mb-12">Choose a plan that fits your mentoring goals—whether you’re exploring, growing, or leading.</p>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[{
                name: "Starter",
                price: "$29/mo",
                features: ["2 sessions / month", "Email support", "Access to community"]
              }, {
                name: "Pro",
                price: "$59/mo",
                features: ["6 sessions / month", "Priority support", "Session recordings"]
              }, {
                name: "Elite",
                price: "$99/mo",
                features: ["12 sessions / month", "1:1 onboarding", "Custom learning plan"]
              }].map((plan) => (
                <div key={plan.name} className="p-6 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{plan.name}</h3>
                  <p className="text-3xl font-bold text-indigo-600 mb-4">{plan.price}</p>
                  <ul className="mb-6 space-y-2 text-gray-700">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="inline-flex w-2 h-2 bg-indigo-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600">Choose Plan</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16 mx-auto bg-white sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="flex flex-col mb-6 sm:text-center">
              <h2 className="mb-6 text-3xl font-bold leading-none text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
              <p className="text-base text-gray-700">Quick answers to common questions about getting started and booking sessions on MentorHub.</p>
            </div>
            <div className="space-y-4">
              {[{
                q: "How do I book a mentor?",
                a: "Create an account, browse mentors, and pick a time that works."
              }, {
                q: "Can I change my mentor later?",
                a: "Yes, you can switch mentors anytime—your progress travels with you."
              }, {
                q: "What if I need to reschedule?",
                a: "Use your dashboard to reschedule; mentors accept most changes with notice."
              }, {
                q: "Do you support corporate plans?",
                a: "Yes, contact us for team onboarding and tailored programs."
              }].map((item, idx) => (
                <div key={item.q} className="border border-gray-200 rounded-lg">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-left"
                    onClick={() => toggleFAQ(idx)}
                  >
                    <span className="text-lg font-medium text-gray-900">{item.q}</span>
                    <span className="text-xl text-gray-500">{isOpen[idx] ? "-" : "+"}</span>
                  </button>
                  {isOpen[idx] && <div className="px-4 pb-4 text-gray-700">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 mx-auto text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-2xl text-center sm:mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Ready to start your mentorship journey?</h2>
            <p className="mb-6 text-indigo-100">Create your profile and connect with a mentor who understands your goals.</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <NavLink
                to="/mentors"
                className="px-6 py-3 font-semibold text-indigo-600 bg-white rounded-md shadow hover:bg-indigo-50"
              >
                Browse Mentors
              </NavLink>
              <NavLink
                to="/signup/mentor"
                className="px-6 py-3 font-semibold text-white border border-white rounded-md hover:bg-white hover:text-indigo-700"
              >
                Become a Mentor
              </NavLink>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300">
          <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="inline-flex items-center">
                  <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">MentorHub</span>
                </div>
                <p className="mt-4 text-sm text-gray-400">Mentorship that moves you forward.</p>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-gray-300">Quick Links</p>
                <ul className="mt-4 space-y-2">
                  <li><NavLink to="/mentors" className="transition-colors duration-200 text-gray-400 hover:text-white">Find Mentors</NavLink></li>
                  <li><NavLink to="/signup/mentor" className="transition-colors duration-200 text-gray-400 hover:text-white">Become a Mentor</NavLink></li>
                  <li><NavLink to="/booking" className="transition-colors duration-200 text-gray-400 hover:text-white">Book a Session</NavLink></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-gray-300">Resources</p>
                <ul className="mt-4 space-y-2">
                  <li><a href="/" className="transition-colors duration-200 text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="/" className="transition-colors duration-200 text-gray-400 hover:text-white">Support</a></li>
                  <li><a href="/" className="transition-colors duration-200 text-gray-400 hover:text-white">Terms &amp; Privacy</a></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-gray-300">Stay Updated</p>
                <p className="mt-4 text-sm text-gray-400">Get tips, stories, and updates.</p>
                <form className="flex flex-col mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-10 px-3 mb-3 text-gray-900 bg-gray-100 rounded"
                  />
                  <button type="submit" className="h-10 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="text-sm text-center text-gray-500">© {new Date().getFullYear()} MentorHub. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
