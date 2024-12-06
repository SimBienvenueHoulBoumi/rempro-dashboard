"use client";

import { logout } from "@/services/authenticate";
import React from "react";
import { TbLogout } from "react-icons/tb";

export default function Sidebar() {
  const handleLogout = async () => {
    try {
      await logout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <aside className="p-2 bg-[#a8c7e4] w-full flex items-center justify-between">
      {/* Image avec taille appropriée */}
      <p className="uppercase font-bold text-white">RPO animee/webtoons</p>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-400 cursor-pointer text-white text-sm font-bold py-2 px-4 rounded"
      >
        <TbLogout size={20} />
        Logout
      </button>
    </aside>
  );
}
