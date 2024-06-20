import { useEffect, useState } from "react";
import logo from "../../public/next.svg";
import UserCard from "@/pages/components/UserCard";
import Link from "next/link";
import Logout from "@/pages/components/Logout";
import { getCurrentUser, getUserInfo } from "../actions/userAction";
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [userInfos, setUserInfos] = useState<User>();

  const toggleShowCard = () => {
    setShowCard((prev) => !prev);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getCurrentUser();
      const userInfo = response.data;
      setUserInfos(userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

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
          <a
            href="https://www.cyberlogitec.com.vn/"
            className="flex text-lg font-semibold"
          >
            <img
              src="https://res.cloudinary.com/de22izcfb/image/upload/v1718901618/xq1ssil2nujdyokgbmpz.png"
              width="75"
              height="75"
              className="p-1"
              alt="Rz Codes Logo"
            />
          </a>
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex text-lg font-semibold">
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer flex items-center"
            >
              <img
                // src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
                src={userInfos?.avatar}
                width="50"
                height="50"
                //className="p-2 "
                className="w-10 rounded-full"
                alt="Rz Codes Logo"
                data-popover-target="profile-menu"
                onClick={toggleShowCard}
                data-dropdown-toggle="dropdown"
              />
              <div
                className={`ml-2 mt-0 text-blue-900 transition-all duration-100 transform ${
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
                <Link
                  href="/create-post"
                  className="text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900"
                >
                  Create Blog
                </Link>
              </li>
              <li className="py-2 lg:py-0 ">
                <a
                  className="text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900"
                  href="/company"
                >
                  Company
                </a>
              </li>

              <li className="py-2 lg:py-0 ">
                <a
                  className="text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900"
                  href="/project"
                >
                  Projects
                </a>
              </li>
              <li className="py-2 lg:py-0 ">
                <Link
                  href="/team"
                  className="text-blue-900 hover:pb-4 hover:border-b-4 hover:border-blue-900"
                >
                  Team
                </Link>
              </li>
              <li className="py-2 lg:py-0 ">
                <Logout />
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
}
