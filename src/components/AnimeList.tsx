import React from "react";
import { CardItemProps } from "@/types/card";

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

interface AnimeListProps {
  data: CardItemProps[];
}

export default function AnimeList({ data }: AnimeListProps) {
  if (!Array.isArray(data)) {
    return <div className="text-red-500">Invalid data format</div>;
  }

  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-md p-4 border border-gray-200 transition-transform transform hover:scale-105"
        >
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
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
      ))}
    </>
  );
}