import { useEffect, useState } from "react";
import logo from "@/public/next.svg";
import { getCurrentUser, getUserInfo } from "../util/actions/userAction";
import MenuNav from "@/src/components/MenuNav";
import React from "react";
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
          <a href="/company" className="flex text-lg font-semibold">
            <img
              src="https://res.cloudinary.com/de22izcfb/image/upload/v1718901618/xq1ssil2nujdyokgbmpz.png"
              width="75"
              height="75"
              className="p-1"
              alt="Rz Codes Logo"
            />
          </a>
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
        <input
          title="menu"
          className="hidden peer"
          type="checkbox"
          id="menu-toggle"
        />
        <div
          className="hidden lg:flex lg:items-center lg:w-auto sm:flex justify-center w-full peer-checked:flex"
          id="menu"
        >
          <MenuNav />
        </div>
      </nav>
    </>
  );
}
