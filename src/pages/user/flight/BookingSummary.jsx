import React from "react";
import { useSelector } from "react-redux";
import { FaMoneyCheck } from "react-icons/fa";

export default function BookingSummary() {
  const { ticketSelected } = useSelector((state) => state.ticket); // Mengambil data tiketSelected dari state ticket
  const isRoundTrip = ticketSelected?.return || ticketSelected?.return_flight; // Memeriksa apakah penerbangan pulang-pergi

  // console.log("ticketSelected: ", ticketSelected);

  // Mengembalikan null jika tidak ada tiket yang dipilih
  if (!ticketSelected) {
    return null;
  }

  // Fungsi untuk memformat nilai ke dalam format mata uang Rupiah (IDR)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  // Fungsi untuk menghitung harga total penumpang berdasarkan jenis penerbangan
  const calculatePassengerPrice = (count, departurePrice, returnPrice) => {
    return isRoundTrip
      ? count * (departurePrice + returnPrice)
      : count * departurePrice;
  };

  // Fungsi untuk menghitung harga total dewasa
  const adultPrice = calculatePassengerPrice(
    ticketSelected?.total_adult,
    ticketSelected?.departure_flight?.price ||
      ticketSelected?.default_departure_price,
    ticketSelected?.return_flight?.price || ticketSelected?.default_return_price
  );

  // Fungsi untuk menghitung harga total anak
  const childrenPrice = calculatePassengerPrice(
    ticketSelected?.total_children,
    ticketSelected?.departure_flight?.price ||
      ticketSelected?.default_departure_price,
    ticketSelected?.return_flight?.price || ticketSelected?.default_return_price
  );

  // Fungsi untuk menghitung harga total bayi
  const babyPrice = calculatePassengerPrice(
    ticketSelected?.total_baby,
    ticketSelected?.departure_flight?.baby_price ||
      ticketSelected?.default_departure_baby_price,
    ticketSelected?.return_flight?.baby_price ||
      ticketSelected?.default_return_baby_price
  );

  return (
    <div className="max-w-[750px] w-full mx-auto bg-white mt-24 rounded-xl shadow-lg mb-5 relative">
      {/* Komponen Format Pemesanan Tiket */}
      <h1 className="text-lg font-semibold mb-3 bg-[#2A629A] text-white rounded-t-xl shadow-md px-4 py-3 flex items-center relative z-10">
        <FaMoneyCheck className="w-7 h-7 mr-3" />
        Format Pemesanan Tiket
      </h1>
      <div className="px-4 py-3">
        <div>
          <div className="flex font-semibold text-lg mb-5">
            <h5>Kode Pemesanan: </h5>
            <p className="text-[#003285] text-xl font-semibold ml-2">
              {ticketSelected?.booking_code}
            </p>
          </div>

          {!isRoundTrip ? null : (
            <div className="flex mb-4">
              <h5 className="font-medium bg-[#86B6F6] rounded-lg text-white px-5 py-0.5 mt-3">
                Pergi
              </h5>
            </div>
          )}
          <div className="flex flex-row gap-3">
            <div className="flex flex-col justify-between items-center">
              <div className="flex flex-col text-center mt-1.5">
                <time className="mb-1 text-lg font-semibold leading-none ">
                  {ticketSelected?.departure?.departure_time ||
                    ticketSelected?.departure_flight?.departure_time}
                </time>
                <div className="text-sm">
                  {new Date(
                    ticketSelected?.departure?.flight_date ||
                      ticketSelected?.departure_flight?.flight_date
                  ).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="flex flex-col text-center mt-1.5">
                <time className="mb-1 text-lg font-semibold leading-none ">
                  {ticketSelected?.departure?.arrival_time ||
                    ticketSelected?.departure_flight?.arrival_time}
                </time>
                <div className="text-sm">
                  {new Date(
                    ticketSelected?.departure?.flight_date ||
                      ticketSelected?.departure_flight?.flight_date
                  ).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div>
              <ol className="relative border-s border-gray-200">
                <li className="mb-5 ms-4">
                  <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                  <h3 className="text-lg font-semibold">
                    {ticketSelected?.departure?.departure_airport ||
                      ticketSelected?.departure_flight?.departure_airport}
                  </h3>
                  <p className="mb-4 text-sm ">
                    {ticketSelected?.departure?.departure_terminal ||
                      ticketSelected?.departure_flight?.departure_terminal}
                  </p>
                </li>
                <li className="mb-5 ms-4 flex flex-col gap-1">
                  <div className="flex items-center">
                    <p>
                      {ticketSelected?.departure?.airline ||
                        ticketSelected?.departure_flight?.airline}
                    </p>
                  </div>
                </li>
                <li className="ms-4">
                  <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                  <h3 className="text-lg font-semibold">
                    {ticketSelected?.departure?.arrival_airport ||
                      ticketSelected?.departure_flight?.arrival_airport}
                  </h3>
                </li>
              </ol>
              <div className="ms-4">
                <p className="text-sm">
                  {ticketSelected?.departure?.arrival_terminal ||
                    ticketSelected?.departure_flight?.arrival_terminal}
                </p>
              </div>
            </div>
          </div>

          {isRoundTrip && (
            <div>
              <div className="flex my-4">
                <h5 className="font-medium bg-[#86B6F6] rounded-lg text-white px-3 py-0.5">
                  Pulang
                </h5>
              </div>
              <div className="flex flex-row gap-3">
                <div className="flex flex-col justify-between items-center">
                  <div className="flex flex-col text-center mt-1.5">
                    <time className="mb-1 text-lg font-semibold leading-none ">
                      {ticketSelected?.return?.departure_time ||
                        ticketSelected?.return_flight?.departure_time}
                    </time>
                    <div className="text-sm">
                      {new Date(
                        ticketSelected?.return?.flight_date ||
                          ticketSelected?.return_flight?.flight_date
                      ).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col text-center mt-1.5">
                    <time className="mb-1 text-lg font-semibold leading-none ">
                      {ticketSelected?.return?.arrival_time ||
                        ticketSelected?.return_flight?.arrival_time}
                    </time>
                    <div className="text-sm">
                      {new Date(
                        ticketSelected?.return?.flight_date ||
                          ticketSelected?.return_flight?.flight_date
                      ).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <ol className="relative border-s border-gray-200">
                    <li className="mb-5 ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <h3 className="text-lg font-semibold">
                        {ticketSelected?.return?.departure_airport ||
                          ticketSelected?.return_flight?.departure_airport}
                      </h3>
                      <p className="mb-4 text-sm ">
                        {ticketSelected?.return?.departure_terminal ||
                          ticketSelected?.return_flight?.departure_terminal}
                      </p>
                    </li>
                    <li className="mb-5 ms-4 flex flex-col gap-1">
                      <div className="flex items-center">
                        <p>
                          {ticketSelected?.return?.airline ||
                            ticketSelected?.return_flight?.airline}
                        </p>
                      </div>
                    </li>
                    <li className="ms-4">
                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                      <h3 className="text-lg font-semibold">
                        {ticketSelected?.return?.arrival_airport ||
                          ticketSelected?.return_flight?.arrival_airport}
                      </h3>
                    </li>
                  </ol>
                  <div className="ms-4">
                    <p className="text-sm">
                      {ticketSelected?.return?.arrival_terminal ||
                        ticketSelected?.return_flight?.arrival_terminal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="my-4 py-3 border-y-2">
            <h5 className="font-semibold text-base">Rincian Harga</h5>
            <div className="flex justify-between">
              <div>
                {ticketSelected?.total_adult !== 0 && (
                  <p>{ticketSelected?.total_adult} Dewasa</p>
                )}
                {ticketSelected?.total_children !== 0 && (
                  <p>{ticketSelected?.total_children} Anak</p>
                )}
                {ticketSelected?.total_baby !== 0 && (
                  <p>{ticketSelected?.total_baby} Bayi</p>
                )}
                <p>Total Sebelum Pajak</p>
                <p>Pajak (10%)</p>
                <p>Total Setelah Pajak</p>
              </div>
              <div>
                {ticketSelected?.total_adult !== 0 && (
                  <div>{formatCurrency(adultPrice)}</div>
                )}
                {ticketSelected?.total_children !== 0 && (
                  <div>{formatCurrency(childrenPrice)}</div>
                )}
                {ticketSelected?.total_baby !== 0 && (
                  <div>{formatCurrency(babyPrice)}</div>
                )}
                <p>{formatCurrency(ticketSelected?.total_before_tax)}</p>
                <p>{formatCurrency(ticketSelected?.tax)}</p>
                <p>{formatCurrency(ticketSelected?.total_price)}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-lg text-[#003285]">
            <h5>Total Harga</h5>
            <h5>{formatCurrency(ticketSelected?.total_price)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
