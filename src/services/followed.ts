/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export type Followed = {
  name: string;
  levelType: string;
  levelNumber: number;
  episodeNumber: number;
};

const defineLevel = (level: string): string => {
  switch (level) {
    case "M":
      return "MOVIE";
    case "A":
      return "ANIME";
    case "S":
      return "SERIES";
    case "W":
      return "WEBTOON";
    default:
      return "MOVIE";
  }
};

export const create = async (data: Followed) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Transform the levelType using defineLevel
    const transformedData = {
      ...data,
      levelType: defineLevel(data.levelType),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/followed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedData),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error(
        `Failed to create item: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error in create function:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};

export const all = async () => {
  try {
    const cookieStore = await cookies(); // Récupère le token depuis les cookies
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/followed`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      throw new Error(
        `Failed to fetch resources: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
