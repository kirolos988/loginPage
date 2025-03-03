"use client";

import React from "react";
import useUserStore from "../../../store/userStore";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { userInfo, clearUserInfo } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
    clearUserInfo();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#6A1B9A] to-[#4A148C]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-[#4A148C] mb-4">Dash Board</h1>
        <div className="bg-gradient-to-r from-[#6A1B9A] to-[#AB47BC] p-6 rounded-lg text-white mb-4">
          <p className="text-lg font-semibold">User Information</p>
          <p className="mt-2 text-sm">User ID: {userInfo?.id || "N/A"}</p>
          <p className="mt-1 text-sm">User Name: {userInfo?.name || "N/A"}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-[#6A1B9A] hover:bg-[#4A148C] text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
