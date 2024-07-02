import React from "react";

export default function Card({ flight, onClick }) {
  return (
    <div className="p-3 flex items-center justify-center">
      <div className="w-11/12 rounded-xl bg-white shadow-lg" onClick={onClick}>
        <div className="flex justify-end">
          <div className="bg-[#2A629A] rounded-tr-xl rounded-bl-xl px-2 py-1">
            <p className="text-white font-medium">Sekali Jalan</p>
          </div>
        </div>
        <div className="p-6 pt-2">
          <h5 className="mb-1 block text-xl font-semibold leading-snug tracking-normal antialiased">
            {flight?.departure?.airport_city} → {flight?.arrival?.airport_city}
          </h5>

          <p className="text-sm">
            {new Date(flight?.flight_date).toLocaleString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex items-center">
            <img
              src={flight?.airline_icon}
              className="h-6"
              alt="Airline Logo"
            />
            <h5 className="text-sm mx-2">{flight?.airline}</h5>
          </div>
          <div>
            <span className="text-sm">{flight?.class}</span>
          </div>
          <h6 className="mt-3">Mulai dari</h6>
          <h5 className="text-lg font-semibold text-[#FF0000]">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(flight?.price)}
          </h5>
        </div>
      </div>
    </div>
  );
}
