import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#FFF0DC]">
      <div className="flex gap-2 items-center">
        <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce">
          M
        </div>
        <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.5s]">
          e
        </div>
        <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.4s]">
          m
        </div>
        <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.3s]">
          u
        </div>
        <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.2s]">
          a
        </div>
        <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.1s]">
          t
        </div>
      </div>
    </div>
  );
}
