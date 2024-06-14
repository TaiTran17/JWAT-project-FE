import { useEffect, useState } from "react";
import logo from "../../public/next.svg";
import UserCard from "@/pages/components/UserCard";
import Link from "next/link";
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [showCard, setShowCard] = useState(false);

  const toggleShowCard = () => {
    setShowCard((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 3000); // Change visibility every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);
  return (
    <>
      <nav className="lg:px-16 px-6 bg-white shadow-md flex flex-wrap items-center lg:py-0 py-2 sticky top-0">
        <img src={logo} alt="" />
        <div className="flex-1 flex justify-between items-center">
          <a href="/" className="flex text-lg font-semibold">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSP1I9j33qxt6ehEwRiFdbW_AZv3MjuzUbQg&s"
              width="50"
              height="50"
              className="p-2"
              alt="Rz Codes Logo"
            />
            <div className="mt-3 text-red-600">Cyberlogictec</div>
          </a>
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex text-lg font-semibold">
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer flex items-center"
            >
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
                width="50"
                height="50"
                className="p-2 "
                alt="Rz Codes Logo"
                data-popover-target="profile-menu"
                onClick={toggleShowCard}
                data-dropdown-toggle="dropdown"
              />
              <div
                className={`mt-3 text-red-600 transition-all duration-100 transform ${
                  isVisible ? "animate-slideInFromTop" : "animate-slideOutToTop"
                }`}
              >
                Welcome Back
              </div>
            </label>
          </div>

          {showCard && (
            <div className="absolute top-12">
              <UserCard />
            </div>
          )}
        </div>

        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden peer" type="checkbox" id="menu-toggle" />
        <div
          className="hidden lg:flex lg:items-center lg:w-auto md:justify-center w-full peer-checked:flex"
          id="menu"
        >
          <nav>
            <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0">
              <li className="py-2 lg:py-0 ">
                <a
                  className="text-red-600 hover:pb-4 hover:border-b-4 hover:border-yellow-400"
                  href="/#"
                >
                  Home
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <Link
                  href="/create-post"
                  className="text-red-600 hover:pb-4 hover:border-b-4 hover:border-yellow-400"
                >
                  Blog
                </Link>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="text-red-600 hover:pb-4 hover:border-b-4 hover:border-yellow-400"
                  href="#"
                >
                  Projects
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="text-red-600 hover:pb-4 hover:border-b-4 hover:border-yellow-400"
                  href="#"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
}
