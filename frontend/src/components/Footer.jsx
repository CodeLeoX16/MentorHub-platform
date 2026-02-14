import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
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
  );
};

export default Footer;
