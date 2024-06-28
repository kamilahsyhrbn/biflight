import React from "react";
import gif from "../images/plane.gif";
import { Toaster } from "react-hot-toast";
// BUAT NYIMPEN AJA SEMBARI NUNGGU API NYA AKU TARO SINI
export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#FFF0DC]">
      {/* <Toaster />
      <div className="w-80">
        <img src={gif} className="" alt="" />
      </div>
      <div className="flex justify-center items-end">
        <div className="flex gap-2 items-center">
          <div className="text-white text-xl text-center w-5 h-5 rounded-full bg-[#2A629A] animate-bounce">
            L
          </div>
          <div className="text-white text-xl text-center w-5 h-5 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.1s]">
            o
          </div>
          <div className="text-white text-xl text-center w-5 h-5 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.2s]">
            a
          </div>
          <div className="text-white text-xl text-center w-5 h-5 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.3s]">
            d
          </div>
          <div className="text-white text-xl text-center w-5 h-5 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.4s]">
            i
          </div>
          <div className="text-white text-xl text-center w-5 h-5 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.5s]">
            n
          </div>
          <div className="text-white text-xl text-center w-5 h-5 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.6s]">
            g
          </div>
        </div>
        <div className="flex gap-2 ml-2">
          <div className="w-2 h-2 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.8s]"></div>
          <div className="w-2 h-2 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.10s]"></div>
          <div className="w-2 h-2 rounded-full bg-[#2A629A] animate-bounce [animation-delay:-.12s]"></div>
        </div>
      </div> */}

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
