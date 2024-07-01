import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserCard from "@/src/components/UserCard";
import { useUserStore } from "@/src/util/store/userStore";
import React from "react";
import { debounce } from "lodash";
import api from "../util/lib/axiosClient";

const MenuNav = () => {
  const [clickedLink, setClickedLink] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();

  const { user, fetchUser } = useUserStore((state) => ({
    user: state.user,
    fetchUser: state.fetchUser,
  }));

  useEffect(() => {
    if (!user) {
      fetchUser(); // Fetch user data only if not already fetched
    }
  }, [user, fetchUser]);

  // Handle link clicks
  const handleLinkClick = (href: any) => (event: any) => {
    event.preventDefault();
    setClickedLink(href);
    router.push(href); // Navigate programmatically using Next.js router
  };

  // Toggle user card visibility
  const toggleShowCard = () => {
    setShowCard((prev) => !prev);
  };

  // Effect to close user card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const userCardElement = document.querySelector(".user-card");
      if (userCardElement && !userCardElement.contains(event.target)) {
        setShowCard(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Optionally render loading state while fetching user data
  }

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

  return (
    <nav>
      <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0">
        <li className="py-2 lg:py-0">
          <a
            href="/topic"
            className={`text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900 ${
              clickedLink === "/topic" ? "border-b-4 border-blue-900 pb-4" : ""
            }`}
            onClick={handleLinkClick("/topic")}
          >
            Topic
          </a>
        </li>
        <li className="py-2 lg:py-0">
          <a
            href="/create-post"
            className={`text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900 ${
              clickedLink === "/create-post"
                ? "border-b-4 border-blue-900 pb-4"
                : ""
            }`}
            onClick={handleLinkClick("/create-post")}
          >
            Create Blog
          </a>
        </li>
        <li className="py-2 lg:py-0">
          <a
            href="/company"
            className={`text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900 ${
              clickedLink === "/company"
                ? "border-b-4 border-blue-900 pb-4"
                : ""
            }`}
            onClick={handleLinkClick("/company")}
          >
            Company
          </a>
        </li>
        <li className="py-2 lg:py-0">
          <a
            href="/project"
            className={`text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900 ${
              clickedLink === "/project"
                ? "border-b-4 border-blue-900 pb-4"
                : ""
            }`}
            onClick={handleLinkClick("/project")}
          >
            Projects
          </a>
        </li>
        <li className="py-2 lg:py-0">
          <a
            href="/team"
            className={`text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900 ${
              clickedLink === "/team" ? "border-b-4 border-blue-900 pb-4" : ""
            }`}
            onClick={handleLinkClick("/team")}
          >
            Team
          </a>
        </li>
        <li className="md:hidden py-2">
          <a
            href="/team"
            className={`text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900 ${
              clickedLink === "/team" ? "border-b-4 border-blue-900 pb-4" : ""
            }`}
            onClick={handleLinkClick("/notedsection")}
          >
            Noted Section
          </a>
        </li>
        <li className="md:hidden py-2">
          <a
            href="/team"
            className={`text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900 ${
              clickedLink === "/team" ? "border-b-4 border-blue-900 pb-4" : ""
            }`}
            onClick={handleLogout}
          >
            Log out
          </a>
        </li>

        {/* User card toggle */}
        <li className="py-4 lg:py-0">
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer flex justify-center"
          >
            <img
              src={user?.avatar}
              width="50"
              height="50"
              className="w-10 h-10 rounded-full object-cover"
              alt="User Avatar"
              onClick={toggleShowCard}
            />
          </label>
          {/* Render user card if showCard is true */}
          {showCard && (
            <div className="absolute top-96 right-96">
              <UserCard />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MenuNav;
