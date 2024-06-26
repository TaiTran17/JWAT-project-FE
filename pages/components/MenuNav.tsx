import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

        {/* User card toggle */}
        <div className="relative">
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
            <div className="absolute top-9 right-96">
              <UserCard />
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default MenuNav;
