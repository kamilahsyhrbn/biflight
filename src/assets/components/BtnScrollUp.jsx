import React from "react";
import ScrollToTop from "react-scroll-up";
import { MdFlight } from "react-icons/md";

export default function BtnScrollTop() {
  return (
    <div className="relative z-[300]">
      <ScrollToTop showUnder={160}>
        <div className="relative overflow-hidden">
          <p className="font-bold cursor-pointer bg-[#2A629A] text-white text-4xl rounded-full p-3">
            <MdFlight className="hover:animate-moveIcon" />
          </p>
        </div>
      </ScrollToTop>
    </div>
  );
}
