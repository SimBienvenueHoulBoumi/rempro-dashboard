/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { TbLogout, TbPlus } from "react-icons/tb";
import { create } from "@/services/followed";
import { logout } from "@/services/authenticate";
import { toast } from "react-toastify";

export default function Sidebar() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    levelType: "M",
    levelNumber: 0,
    episodeNumber: 0,
  });
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const handleCreate = () => {
    setShowForm(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "levelNumber" || name === "episodeNumber" ? +value : value,
    }));
  };

  const handleSubmit = async () => {
    setError(""); // Reset error message
    try {
      const validLevelTypes = ["M", "A", "S", "W"];
      if (!validLevelTypes.includes(formData.levelType)) {
        throw new Error("Invalid level type. Please select a valid option.");
      }

      await create({ ...formData });

      setFormData({
        name: "",
        levelType: "M",
        levelNumber: 0,
        episodeNumber: 0,
      });

      setShowForm(false);

      setTimeout(() => {
        toast.success("Followed added successfully");
      }, 2000);
    } catch (error: any) {
      setError(error.message || "Failed to create item. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <aside className="p-2 bg-[#a8c7e4] w-full flex items-center justify-between">
        <p className="uppercase font-bold text-white truncate max-w-[150px] sm:max-w-full">
          RPO animee/webtoons
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 cursor-pointer text-white text-sm font-bold py-2 px-4 rounded"
          >
            <TbPlus size={20} />
            Create
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-400 cursor-pointer text-white text-sm font-bold py-2 px-4 rounded"
          >
            <TbLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create a New Item</h2>
            {error && (
              <div className="bg-red-100 border border-red-500 text-red-700 p-3 mb-4 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-200"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="levelType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Level Type
                </label>
                <select
                  id="levelType"
                  name="levelType"
                  value={formData.levelType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-200"
                  required
                >
                  <option value="M">MOVIE</option>
                  <option value="A">ANIME</option>
                  <option value="S">SERIES</option>
                  <option value="W">WEBTOON</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="levelNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Level Number
                </label>
                <input
                  type="number"
                  id="levelNumber"
                  name="levelNumber"
                  value={formData.levelNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="episodeNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Episode Number
                </label>
                <input
                  type="number"
                  id="episodeNumber"
                  name="episodeNumber"
                  value={formData.episodeNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
