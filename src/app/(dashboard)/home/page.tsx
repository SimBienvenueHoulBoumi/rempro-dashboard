"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { all } from "@/services/followed";
import Loader from "@/components/Loader";

interface CardItem {
  name: string;
  levelType: string;
  levelNumber: number;
  episodeNumber: number;
}

const defineLevel = (level: string): string => {
  switch (level) {
    case "M":
      return "Movie";
    case "A":
      return "Anime";
    case "S":
      return "Series";
    case "W":
      return "Webtoon";
    default:
      return "Unknown";
  }
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await all();
        setData(fetchedData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorMessage("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search function
  const searchByName = (query: string) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Apply search
  const filteredData = searchByName(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      {/* Search bar */}
      <div className="w-full max-w-3xl mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="w-full h-12 px-4 pl-12 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Display content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="text-red-500 text-center col-span-full">
            {errorMessage}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-gray-500 text-center col-span-full">
            No items found.
          </div>
        ) : (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 border border-gray-200 transition-transform transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Type: </strong> {defineLevel(item.levelType)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Episode/Season: </strong>
                <span>
                  {item.levelNumber}/{item.episodeNumber}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
