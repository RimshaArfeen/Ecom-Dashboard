import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("usersData");
  const navigate = useNavigate(); // Fix: Call useNavigate as a function

  const logOut = () => {
    localStorage.clear();
    navigate("/signUp");
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-semibold">Brand</span>
        </NavLink>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {auth ? (
            <>
              <NavLink to="/" className="mr-4 uppercase hover:text-indigo-400 transition duration-300">
                Products
              </NavLink>
              <NavLink to="/add" className="mr-4 uppercase hover:text-indigo-400 transition duration-300">
                Add Product
              </NavLink>
              {/* <NavLink to="/update" className="mr-4 uppercase hover:text-indigo-400 transition duration-300">
                Update
              </NavLink> */}
              <NavLink to="/profile" className="mr-4 uppercase hover:text-indigo-400 transition duration-300">
                Profile
              </NavLink>
              <button
                onClick={logOut}
                className="mr-4 uppercase hover:text-red-500 transition duration-300"
              >
                Logout {JSON.parse(auth).name}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signUp" className="mr-4 uppercase hover:text-indigo-400 transition duration-300">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="mr-4 uppercase hover:text-indigo-400 transition duration-300">
                Login
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
