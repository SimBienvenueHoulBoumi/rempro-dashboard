import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full mt-10 col-span-full">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}
