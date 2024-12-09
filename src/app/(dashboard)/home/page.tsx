"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface CardItem {
  name: string;
  type: string;
  episode: string;
  number: number;
  lastUpdate: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Exemple de données pour les cartes
  const sampleData: CardItem[] = [
    {
      name: "Card 1",
      type: "Type A",
      episode: "E01",
      number: 1,
      lastUpdate: "2024-12-08",
    },
    {
      name: "Card 2",
      type: "Type B",
      episode: "E05",
      number: 2,
      lastUpdate: "2024-12-07",
    },
    {
      name: "Card 3",
      type: "Type C",
      episode: "E03",
      number: 3,
      lastUpdate: "2024-12-06",
    },
    {
      name: "Card 4",
      type: "Type A",
      episode: "E02",
      number: 4,
      lastUpdate: "2024-12-05",
    },
    {
      name: "Card 5",
      type: "Type D",
      episode: "E07",
      number: 5,
      lastUpdate: "2024-12-04",
    },
    {
      name: "Card 6",
      type: "Type E",
      episode: "E10",
      number: 6,
      lastUpdate: "2024-12-03",
    },
  ];

  // Fonction de recherche par nom
  const searchByName = (query: string) => {
    return sampleData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Appliquer la recherche sur les données
  const filteredData = searchByName(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      {/* Barre de recherche */}
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

      {/* Grille responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 border border-gray-200 transition-transform transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600">
              <strong>Type:</strong> {item.type}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Episode:</strong> {item.episode}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Number:</strong> {item.number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Last Update:</strong> {item.lastUpdate}
            </p>
          </div>
        ))}
        {/* Message si aucun résultat */}
        {filteredData.length === 0 && (
          <div className="text-gray-500 text-center col-span-full">
            No items found.
          </div>
        )}
      </div>
    </div>
  );
}
