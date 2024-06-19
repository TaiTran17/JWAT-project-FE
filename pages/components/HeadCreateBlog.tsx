import React from "react";

const HeadCreateBlog: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Welcome back!
      </h2>
      <p className="text-xl text-gray-600 text-center">
        Make a place to store memories
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <a href="#" className="text-xs text-center text-gray-500 uppercase">
          Blog's information
        </a>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>
    </>
  );
};

export default HeadCreateBlog;
