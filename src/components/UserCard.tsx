import React, { useEffect } from "react";
import { useUserStore } from "../util/store/userStore";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import api from "../util/lib/axiosClient";

interface IUserCardProps {}

const UserCard: React.FC<IUserCardProps> = () => {
  const { user, fetchUser, clearUser } = useUserStore((state) => ({
    user: state.user,
    fetchUser: state.fetchUser,
    clearUser: state.clearUser,
  }));

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      fetchUser(); // Fetch user data only if not already fetched
    }
  }, [user, fetchUser]); // Trigger fetchUser if user state changes or fetchUser function changes

  const handleLogout = debounce(async () => {
    try {
      const response = await api.post("/auth/logout", {});

      if (response.data) {
        Cookie.remove("Authorization");
        Cookie.remove("Refresh");

        clearUser(); // Clear user state on logout

        router.push("http://localhost:3001/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, 300); // Debounce with 300ms delay

  const handleNavigateToNotedSection = debounce(() => {
    router.push("/notedsection");
  }, 300); // Debounce with 300ms delay

  if (!user) {
    return <div>Loading...</div>; // Optionally render loading state while fetching user data
  }

  return (
    <div className="user-card animate-slideInFromTop fixed right-0 top-16 w-fit h-fit max-w-lg bg-white  rounded-lg shadow ">
      <div className="flex flex-col items-center p-10 md:p-4">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
          src={user?.avatar}
          alt="Avatar"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.username}
        </h5>
        <span className="text-xl font-normal text-gray-500 dark:text-gray-400">
          Role: {user?.role}
        </span>
        <button
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleNavigateToNotedSection}
        >
          Noted Section
        </button>

        <button
          className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserCard;
