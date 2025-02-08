import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-100 body-font bg-gray-900 shadow-lg fixed w-full bottom-0">
      <div className="container mx-auto p-5 py-3 flex flex-wrap items-center justify-between">
        <span className="text-lg font-semibold">© 2024 Brand. All rights reserved.</span>

        <span className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
            <i className="ri-facebook-fill text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
            <i className="ri-twitter-fill text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
            <i className="ri-instagram-fill text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-red-600 transition duration-300">
            <i className="ri-youtube-fill text-2xl"></i>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
