import { useRouter } from "next/router";
import React from "react";
import Cookie from "js-cookie";
import { Button } from "flowbite-react";

export default function Logout() {
  const router = useRouter();
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

      console.log("cehck res", response);

      if (response.ok) {
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
