import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logout from "@/pages/components/Logout";
import UserCard from "@/pages/components/UserCard";
import { useUserStore } from "@/pages/store/userStore";

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
  }, [user, fetchUser]); // Trigger fetchUser if user state changes or fetchUser function changes

  if (!user) {
    return <div>Loading...</div>; // Optionally render loading state while fetching user data
  }

  const handleLinkClick = (href: any) => (event: any) => {
    event.preventDefault();

    // Update clicked link state
    setClickedLink(href);

    // Navigate programmatically using Next.js router
    router.push(href);
  };

  const toggleShowCard = () => {
    setShowCard((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const userCardElement = document.querySelector(".user-card");
      if (userCardElement && !userCardElement.contains(event.target)) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0">
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

        <label
          htmlFor="menu-toggle"
          className="cursor-pointer flex justify-center"
        >
          <img
            src={user?.avatar}
            width="50"
            height="50"
            className="w-11 h-10 rounded-full"
            alt="Rz Codes Logo"
            data-popover-target="profile-menu"
            onClick={toggleShowCard}
            data-dropdown-toggle="dropdown"
          />
        </label>
        {showCard && (
          <div className="absolute top-12">
            <UserCard />
          </div>
        )}
      </ul>
    </nav>
  );
};

export default MenuNav;
