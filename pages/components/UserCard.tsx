import React from "react";

export default function UserCard() {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Bonnie Green
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Visual Designer
        </span>
        <a
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          href="/notedsection"
        >
          Noted Section
        </a>
      </div>
    </div>
  );
}
