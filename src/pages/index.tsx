import { Inter } from "next/font/google";
import Login from "@/src/components/Login";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Login />;
}
