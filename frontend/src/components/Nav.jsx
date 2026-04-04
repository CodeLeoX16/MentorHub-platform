import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Dropdown, Menu } from "antd";
import { AiOutlineDashboard, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import logo from "../assets/logo-no-background.png";
import useUserStore from "../store/user";
import { removeToken } from "../helper";

export const Nav = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore(); // Destructure setUser from store
  const [mobileOpen, setMobileOpen] = useState(false);

  const signInBtnClick = () => {
    navigate("/signin");
  };
   
  const signUpStudentBtnClick = () => {
    navigate("/signup/student");
  };

  const signUpMentorBtnClick = () => {
    navigate("/signup/mentor");
  };

  const onButtonClick = () => {
    removeToken(); // Assuming you have this function to remove the token
    setUser(null);
    navigate("/");
  };

  const closeMobile = () => setMobileOpen(false);

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<AiOutlineDashboard />}>
        <NavLink className="text-base" to="/dashboard/profile">
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<FiLogOut />}>
        <button onClick={onButtonClick} className="w-full text-base text-left">
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="relative animate-fade-in-up shadow-xl rounded-2xl overflow-hidden z-50">
      <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-purple-500 via-teal-400 to-pink-400 opacity-80 blur-lg -z-10" />
      <div className="glass-card px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="inline-flex items-center mr-8 group">
              <img className="w-48 drop-shadow-lg transition-transform duration-300 group-hover:scale-105" src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="items-center hidden space-x-8 lg:flex">
            {!user ? (
              <>
                <button
                  onClick={signUpMentorBtnClick}
                  className="h-11 px-5 font-semibold text-white bg-gradient-to-r from-purple-700 via-teal-600 to-pink-600 border border-purple-700 rounded-2xl shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-700 hover:to-teal-600 hover:scale-105 active:scale-95 animate-fade-in"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-200" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" /></svg>
                    Become a Mentor
                  </span>
                </button>
                <button
                  onClick={signInBtnClick}
                  className="font-semibold text-white bg-gradient-to-r from-teal-700 to-purple-700 rounded-2xl px-4 py-2 shadow-md border border-teal-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-teal-700 hover:scale-105 active:scale-95 animate-fade-in"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-200" fill="currentColor" viewBox="0 0 20 20"><path d="M3 8a4 4 0 018 0v4a4 4 0 01-8 0V8zm8 0a4 4 0 018 0v4a4 4 0 01-8 0V8z" /></svg>
                    Sign in
                  </span>
                </button>
                <button
                  onClick={signUpStudentBtnClick}
                  className="inline-flex items-center justify-center h-11 px-5 font-semibold text-white bg-gradient-to-r from-purple-700 to-teal-700 rounded-2xl shadow-xl border border-purple-700 transition-all duration-300 hover:from-teal-700 hover:to-purple-700 hover:scale-105 active:scale-95 animate-fade-in"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-5 h-5 text-pink-200" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" /></svg>
                    Sign up
                  </span>
                </button>
              </>
            ) : (
              <Dropdown overlay={menu} trigger={["hover"]}>
                <button className="flex items-center justify-center font-semibold tracking-wide text-white border border-white/30 rounded-full w-11 h-11 glass-card bg-gradient-to-r from-purple-400 via-teal-300 to-pink-400 shadow-xl hover:text-purple-700 hover:bg-white/70 hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in">
                  <FaUser className="text-white" />
                </button>
              </Dropdown>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              aria-label="Toggle navigation"
              className="p-2 text-white rounded-xl bg-white/10 hover:bg-white/30 shadow transition-all duration-200"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mt-4 space-y-3 rounded-2xl glass-card shadow-xl p-4 lg:hidden animate-fade-in-up">
            {!user ? (
              <>
                <button
                  onClick={() => {
                    closeMobile();
                    signUpMentorBtnClick();
                  }}
                  className="w-full h-11 px-4 font-medium text-left text-white bg-gradient-to-r from-purple-500 to-teal-400 rounded-xl shadow hover:from-teal-400 hover:to-purple-500 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Become a Mentor
                </button>
                <button
                  onClick={() => {
                    closeMobile();
                    signInBtnClick();
                  }}
                  className="w-full text-left text-white rounded-xl px-4 py-2 hover:bg-purple-100 hover:text-purple-700 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    closeMobile();
                    signUpStudentBtnClick();
                  }}
                  className="w-full h-11 px-4 font-medium text-left text-white bg-gradient-to-r from-purple-500 to-teal-400 rounded-xl shadow hover:from-teal-400 hover:to-purple-500 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard/profile"
                  onClick={closeMobile}
                  className="block w-full px-2 py-2 text-white rounded-xl hover:bg-purple-100 hover:text-purple-700 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    closeMobile();
                    onButtonClick();
                  }}
                  className="block w-full px-2 py-2 text-left text-white rounded-xl hover:bg-purple-100 hover:text-purple-700 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
