import React, { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

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

  const handleLogout = async () => {
    const accessToken = Cookie.get("Authorization");
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
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
  };

  if (!user) {
    return <div>Loading...</div>; // Optionally render loading state while fetching user data
  }

  return (
    <div className="user-card animate-slideInFromTop absolute w-fit top-4 -right-96 max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-10">
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
        <a
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          href="/notedsection"
        >
          Noted Section
        </a>

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
