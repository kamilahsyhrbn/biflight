import React from "react";
import { useDispatch } from "react-redux";
import { getFlight } from "../../redux/actions/flight/flightActions";
import { useNavigate } from "react-router-dom";
import { setChoosenFlight } from "../../redux/reducers/flight/flightReducers";

export default function Card({ flight }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // JIKA KARTU DI KLIK, AKAN DIRECT KE HALAMAN HASIL PENCARIAN
  const handleClick = (departure_code, arrival_code, date, seat_class) => {
    dispatch(
      getFlight(departure_code, arrival_code, date, seat_class, 1, "", 1)
    );
    dispatch(setChoosenFlight([]));
    navigate(
      `/hasil-pencarian?from=${departure_code}&to=${arrival_code}&departureDate=${date}&class=${seat_class}&passenger=1&adult=1&child=0&infant=0`,
      { replace: true }
    );
  };
  return (
    <div className="p-3">
      <div
        className="w-11/12 rounded-xl bg-white shadow-lg"
        onClick={() =>
          handleClick(
            flight?.departure?.airport_code,
            flight?.arrival?.airport_code,
            flight?.flight_date,
            flight?.class
          )
        }
      >
        <div className="flex justify-between">
          <div></div>
          <div className="bg-red-500 rounded-t-full rounded-l-full px-2">
            <p className="text-white font-medium">Sekali Jalan</p>
          </div>
        </div>
        <div className="p-6 pt-3">
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
