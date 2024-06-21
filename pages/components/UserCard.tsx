import React, { useEffect } from "react";
import { useUserStore } from "../store/userStore";

export default function UserCard() {
  const { user, fetchUser } = useUserStore((state) => ({
    user: state.user,
    fetchUser: state.fetchUser,
  }));

  useEffect(() => {
    if (!user) {
      fetchUser(); // Fetch user data only if not already fetched
    }
  }, [user, fetchUser]); // Trigger fetchUser if user state changes or fetchUser function changes

  if (!user) {
    return <div>Loading...</div>; // Optionally render loading state while fetching user data
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-10">
        <img
          className="h-24 mb-3 rounded-full shadow-lg"
          src={user?.avatar}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.role}
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
