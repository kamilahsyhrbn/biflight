import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="bg-[#FFF0DC] h-screen flex justify-center items-center">
      <div className="text-center text-4xl font-bold">
        <iframe
          src="https://lottie.host/embed/2af231a8-4446-476d-8fc1-072768c977e3/jDM7FCulyH.json"
          className="h-full w-full mb-3"
        ></iframe>
        Halaman Tidak Ditemukan
        <div className="text-xl my-3 hover:text-[#003285]">
          <Link to="/">Kembali ke beranda</Link>
        </div>
      </div>
    </div>
  );
}
