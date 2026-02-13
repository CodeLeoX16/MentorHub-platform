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
    <div className="bg-gray-900">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="inline-flex items-center mr-8">
              <img className="w-48" src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="items-center hidden space-x-8 lg:flex">
            {!user ? (
              <>
                <button
                  onClick={signUpMentorBtnClick}
                  className="h-11 px-5 font-medium text-gray-100 transition-colors duration-200 border border-gray-700 rounded hover:bg-white hover:text-black"
                >
                  Become a Mentor
                </button>
                <button
                  onClick={signInBtnClick}
                  className="font-medium text-gray-100 transition-colors duration-200 hover:text-teal-300"
                >
                  Sign in
                </button>
                <button
                  onClick={signUpStudentBtnClick}
                  className="inline-flex items-center justify-center h-11 px-5 font-medium text-white transition duration-200 bg-purple-500 rounded shadow-md hover:bg-purple-700"
                >
                  Sign up
                </button>
              </>
            ) : (
              <Dropdown overlay={menu} trigger={["hover"]}>
                <button className="flex items-center justify-center font-medium tracking-wide text-gray-100 transition-colors duration-200 border border-white rounded-full w-10 h-10 hover:text-black">
                  <FaUser className="text-white" />
                </button>
              </Dropdown>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              aria-label="Toggle navigation"
              className="p-2 text-white rounded-md hover:bg-gray-800"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mt-4 space-y-3 rounded-lg bg-gray-800 p-4 lg:hidden">
            {!user ? (
              <>
                <button
                  onClick={() => {
                    closeMobile();
                    signUpMentorBtnClick();
                  }}
                  className="w-full h-11 px-4 font-medium text-left text-gray-100 bg-gray-700 rounded"
                >
                  Become a Mentor
                </button>
                <button
                  onClick={() => {
                    closeMobile();
                    signInBtnClick();
                  }}
                  className="w-full text-left text-gray-100"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    closeMobile();
                    signUpStudentBtnClick();
                  }}
                  className="w-full h-11 px-4 font-medium text-left text-white bg-purple-500 rounded"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard/profile"
                  onClick={closeMobile}
                  className="block w-full px-2 py-2 text-white rounded hover:bg-gray-700"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    closeMobile();
                    onButtonClick();
                  }}
                  className="block w-full px-2 py-2 text-left text-white rounded hover:bg-gray-700"
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
