import React from "react";

export default function BlogHeader() {
  return (
    <div className="flex flex-col box-border items-center justify-center ">
      <div className="w-3/4 h-fit block mx-10 mb-5 max-h-96  font-bold text-black   p-24 uppercase text-center">
        <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 mb-5">
          August 5 , 2023
        </div>
        <div>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Release of Tailwing Nextjs Starter Blog v2.0
          </h1>
        </div>
      </div>
      <div className="w-full h-auto">
        <img
          src="https://photo.znews.vn/w1920/Uploaded/jopluat/2024_06_10/z5527370436321_7d17e41e74f0de7095fc607461f0eaeb.jpg"
          alt=""
          className="w-full h-[500px]"
        />
      </div>
    </div>
  );
}
