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

      if (response.ok) {
        Cookie.remove("Authorization");
        Cookie.remove("Refresh");

        router.push("/#");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button className="text-red-600 " onClick={handleLogout}>
      Logout
    </button>
  );
}
