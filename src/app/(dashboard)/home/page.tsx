"use client"

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Liste d'exemple pour afficher après la recherche
  const sampleList = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 h-screen p-4">
      {/* Conteneur central pour la barre de recherche et la liste */}
      <div className="w-full max-w-lg shadow-lg rounded-xl bg-white p-8 space-y-6">
        {/* Barre de recherche */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for items..."
            className="w-full h-12 px-4 pl-12 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Liste de résultats */}
        <div className="w-full max-h-48 overflow-auto bg-gray-50 rounded-lg shadow-inner p-2">
          <ul className="space-y-3">
            {sampleList
              .filter((item) =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item, index) => (
                <li
                  key={index}
                  className="p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"
                >
                  {item}
                </li>
              ))}
            {/* Affichage lorsque la liste est vide */}
            {sampleList.filter((item) =>
              item.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <li className="text-center text-gray-500 p-3">No results found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
