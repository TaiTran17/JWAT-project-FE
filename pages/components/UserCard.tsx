import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../actions/userAction";

export default function UserCard() {
  const [userInfos, setUserInfos] = useState<User>();

  const fetchUserInfo = async () => {
    try {
      const response = await getCurrentUser();
      const userInfo = response.data;
      setUserInfos(userInfo);
      console.log(userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-10">
        <img
          className=" h-24 mb-3 rounded-full shadow-lg"
          src={userInfos?.avatar}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userInfos?.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userInfos?.role}
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
