import React from "react";

const Footer = () => {
  return (
    <footer className="px-6 py-10 text-white bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-semibold">MentorHub</h3>
            <p className="text-sm text-gray-300">
              Guidance, growth, and great conversations.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-gray-200">
            <a href="#" className="hover:text-teal-300">
              Facebook
            </a>
            <a href="#" className="hover:text-teal-300">
              Twitter
            </a>
            <a href="#" className="hover:text-teal-300">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="text-sm text-center text-gray-400">
          © 2024 MentorHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
