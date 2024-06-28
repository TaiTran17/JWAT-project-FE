import { useRouter } from "next/router";
import React from "react";
import Cookie from "js-cookie";
import { Button } from "flowbite-react";
import api from "../util/lib/axiosClient";

export default function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout", {});

      if (response.data) {
        Cookie.remove("Authorization");
        Cookie.remove("Refresh");

        router.push("http://localhost:3001/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button className="text-blue-900 " onClick={handleLogout}>
      Logout
    </button>
  );
}
