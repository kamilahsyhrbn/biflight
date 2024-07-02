import React, { useState, useEffect } from "react";
import {
  MdFlightTakeoff,
  MdFlightLand,
  MdOutlineDateRange,
} from "react-icons/md";
import { PiSeatFill } from "react-icons/pi";
import {
  FaArrowsRotate,
  FaPerson,
  FaBaby,
  FaChildDress,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { getFlight } from "../../../redux/actions/flight/flightActions";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Calendar } from "react-date-range";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import AirportInput from "../AirportInput";
import { useNavigate } from "react-router-dom";
import { setChoosenFlight } from "../../../redux/reducers/flight/flightReducers";

export default function SearchMobile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seatModalOpen, setSeatModalOpen] = useState(false); // MODAL KELAS PENERBANGAN
  const [passengerModalOpen, setPassengerModalOpen] = useState(false); // MODAL JUMLAH PENUMPANG
  const [dateModalOpen, setDateModalOpen] = useState(false); // MODAL TANGGAL PENERBANGAN
  const [isChecked, setIsChecked] = useState(false); // TOGGLE TANGGAL KEPULANGAN
  const [filter, setFilter] = useState("");
  const [departure_code, setDeparture_code] = useState("CGK");
  const [arrival_code, setArrival_code] = useState("DPS");
  const [seat_class, setSeat_class] = useState("Economy");
  const [total_passenger, setTotal_passenger] = useState(1);
  const [departure_date, setDeparture_date] = useState(new Date());
  const [penumpang, setPenumpang] = useState({
    dewasa: 1,
    anak: 0,
    bayi: 0,
  });

  const today = new Date();
  // Membuat tanggal besok dengan menambahkan 1 hari ke tanggal hari ini
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  // BUAT NUKER POSISI DARI DESTINASI AWAL-DESTINASI TUJUAN
  const handleRotateClick = () => {
    setDeparture_code(arrival_code);
    setArrival_code(departure_code);
  };

  // BUAT INPUT KELAS PENERBANGAN
  const handleSeat = (e) => {
    setSeat_class(e.target.value);
  };

  // BUAT NAMPILIN INPUT TANGGAL KEPULANGAN
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  // BUAT MENGAMBIL TANGGAL PERGI
  const handleSelectDate = (date) => {
    setDeparture_date(date);
  };

  // BUAT COUNTER JUMLAH PENUMPANG
  const handlePenumpang = (name, operation) => {
    setPenumpang((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? penumpang[name] + 1 : penumpang[name] - 1,
      };
    });
  };

  // BUAT JUMLAHIN TOTAL PENUMPANG
  useEffect(() => {
    const getTotalPenumpang = () => {
      return penumpang?.dewasa + penumpang?.anak + penumpang?.bayi;
    };

    setTotal_passenger(getTotalPenumpang());
  }, [penumpang]);

  // BUAT SUBMIT SEARCH
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departure_code || !arrival_code) {
      toast("Harap pilih destinasi Anda!"),
        {
          style: {
            background: "#FF0000", // Background merah
            color: "#FFFFFF", // Teks putih
            borderRadius: "12px", // Rounded-xl
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
            width: "full",
            maxWidth: "900px",
          },
          position: "top-center", // Posisi toast
          duration: 3000, // Durasi toast
        };
      return;
    }

    if (departure_code === arrival_code) {
      toast("Harap pilih destinasi yang berbeda!"),
        {
          style: {
            background: "#FF0000", // Background merah
            color: "#FFFFFF", // Teks putih
            borderRadius: "12px", // Rounded-xl
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
            width: "full",
            maxWidth: "900px",
          },
          position: "top-center", // Posisi toast
          duration: 3000, // Durasi toast
        };
      return;
    }

    if (isChecked === true && date[0].endDate === null) {
      toast("Harap isi tanggal kepulangan!"),
        {
          style: {
            background: "#FF0000", // Background merah
            color: "#FFFFFF", // Teks putih
            borderRadius: "12px", // Rounded-xl
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
            width: "full",
            maxWidth: "900px",
          },
          position: "top-center", // Posisi toast
          duration: 3000, // Durasi toast
        };
      return;
    }

    const departureDate = format(new Date(date[0].startDate), "yyyy-MM-dd");
    const returnDate = format(new Date(date[0].endDate), "yyyy-MM-dd");
    const singleDate = format(new Date(departure_date), "yyyy-MM-dd");

    if (isChecked) {
      dispatch(
        getFlight(
          departure_code,
          arrival_code,
          departureDate,
          seat_class,
          total_passenger,
          filter,
          1
        )
      );
    } else {
      dispatch(
        getFlight(
          departure_code,
          arrival_code,
          singleDate,
          seat_class,
          total_passenger,
          filter,
          1
        )
      );
    }

    dispatch(setChoosenFlight([]));

    // Navigasi ke halaman pencarian
    if (isChecked && returnDate) {
      navigate(
        `/hasil-pencarian?from=${departure_code}&to=${arrival_code}&departureDate=${departureDate}&returnDate=${returnDate}&class=${seat_class}&passenger=${total_passenger}&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`,
        { replace: true }
      );
    } else {
      navigate(
        `/hasil-pencarian?from=${departure_code}&to=${arrival_code}&departureDate=${singleDate}&class=${seat_class}&passenger=${total_passenger}&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`,
        { replace: true }
      );
    }
  };

  // MODAL MILIH KELAS PENERBANGAN
  const handleSeatModal = () => {
    setSeatModalOpen(!seatModalOpen);
  };

  // MODAL JUMLAH PENUMPANG
  const handlePassengerModal = () => {
    setPassengerModalOpen(!passengerModalOpen);
  };

  // MODAL PILIH TANGGAL PENERBANGAN
  const handleDateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  return (
    <div className={`${isChecked ? "mb-10" : ""}`}>
      <div className="bg-[#2A629A] rounded-b-3xl w-full h-[300px] py-3 px-4">
        <Toaster
          toastOptions={{
            className: "w-full",
            duration: 3000,
            style: {
              background: "#FF0000",
              color: "#fff",
            },
          }}
        />
        <h4 className="text-2xl text-white font-medium my-3">
          Ke mana pun Anda pergi, kami akan mengantar Anda!
        </h4>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg">
              <div className="flex flex-col p-3">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h5 className="text-gray-500 text-sm font-medium mr-1">
                      Dari
                    </h5>
                    <div className="flex flex-row items-center">
                      <div className="w-full">
                        <AirportInput
                          value={departure_code}
                          onChange={(airportCode) =>
                            setDeparture_code(airportCode)
                          }
                          placeholder="Pilih kota awal"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2A629A] peer"
                        />
                      </div>
                    </div>
                  </div>
                  {/* BUTTON TUKER POSISI */}
                  <div className="mt-10">
                    <button
                      type="button"
                      id="rotateAirport"
                      className="bg-[#003285] text-white p-3 rounded-full "
                      onClick={handleRotateClick}
                    >
                      <FaArrowsRotate />
                    </button>
                  </div>
                </div>
                <div className="my-5">
                  <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                    Ke
                  </h5>
                  <div className="flex flex-row items-center">
                    <MdFlightLand className="text-xl text-gray-500 absolute" />
                    <div className="w-full">
                      <AirportInput
                        value={arrival_code}
                        onChange={(airportCode) => setArrival_code(airportCode)}
                        placeholder="Pilih kota tujuan"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2A629A] peer"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-5">
                  <h5 className="text-[#2A629A] text-sm font-medium mr-3.5">
                    Pulang-Pergi?
                  </h5>
                  <label
                    htmlFor="toggle"
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value=""
                      id="toggle"
                      className="sr-only peer"
                      onChange={handleToggleChange}
                    />
                    <div
                      className={`group peer ring-0 ${
                        isChecked ? "bg-[#003285]" : "bg-[#86B6F6]"
                      } rounded-full outline-none duration-300 after:duration-300 w-12 h-7 shadow-md peer-focus:outline-none after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-0 after:translate-x-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:translate-x-0`}
                    ></div>
                  </label>
                </div>
                <div>
                  <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                    Tanggal Pergi
                  </h5>
                  <div className="flex flex-row items-center">
                    <MdOutlineDateRange className="text-xl text-gray-500 absolute" />
                    <span
                      className="block py-2.5 px-8 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                      onClick={handleDateModal}
                    >
                      {isChecked ? (
                        <div>
                          {`${format(date[0].startDate, "dd/MM/yyyy")} `}
                        </div>
                      ) : (
                        <div>{`${format(departure_date, "dd/MM/yyyy")} `}</div>
                      )}
                    </span>
                  </div>
                </div>
                {isChecked ? (
                  <div className="mt-5">
                    <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                      Tanggal Pulang
                    </h5>
                    <div className="flex flex-row items-center">
                      <MdOutlineDateRange className="text-xl text-gray-500 absolute" />
                      <span
                        className="block py-2.5 px-8 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                        onClick={handleDateModal}
                      >
                        {date[0].endDate
                          ? `${format(date[0].endDate, "dd/MM/yyyy")}  `
                          : "Pilih Tanggal"}
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="my-5 flex justify-around">
                  <div>
                    <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                      Penumpang
                    </h5>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <FaPerson className="text-xl absolute" />
                        <div className="relative flex gap-2 z-0">
                          <div
                            className="block py-2.5 px-6 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                            onClick={handlePassengerModal}
                          >
                            {total_passenger} Penumpang
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-gray-500 text-sm font-medium mr-3.5">
                      Kelas Penerbangan
                    </h5>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <PiSeatFill className="text-xl absolute" />
                        <div className="relative flex gap-2 z-0">
                          <div
                            className="block py-2.5 px-6 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
                            onClick={handleSeatModal}
                          >
                            {seat_class}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  id="searchFlights"
                  className="w-full p-4 bg-[#2A629A] text-white rounded-lg transition-colors duration-300 hover:bg-[#003285]"
                  onClick={handleSubmit}
                >
                  Cari Penerbangan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL PILIH KELAS KURSI PENERBANGAN */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
          seatModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full max-w-md max-h-full transform transition-transform duration-300 ease-in-out ${
            seatModalOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Pilih kelas penerbangan
              </h3>
              <button
                type="button"
                id="closeSeatModal"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                onClick={handleSeatModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <ul className="space-y-4 mb-4">
                <li>
                  <input
                    type="radio"
                    id="economy"
                    name="kelas"
                    value="Economy"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="economy"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Economy
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="prEconomy"
                    name="kelas"
                    value="Premium Economy"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="prEconomy"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Premium Economy
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="business"
                    name="kelas"
                    value="Business"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="business"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        Business
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="frClass"
                    name="kelas"
                    value="First"
                    className="hidden peer"
                    onChange={handleSeat}
                  />
                  <label
                    htmlFor="frClass"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-[#2A629A] peer-checked:text-white hover:text-gray-900 hover:bg-[#EEF5FF]"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">First</div>
                    </div>
                  </label>
                </li>
              </ul>
              <button
                type="button"
                id="saveSeatModal"
                className="text-white inline-flex w-full justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleSeatModal}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PILIH JUMLAH PENUMPANG */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
          passengerModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full lg:w-2/5 max-w-2xl max-h-full transform transition-transform duration-300 ease-in-out ${
            passengerModalOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Pilih Jumlah Penumpang
              </h3>
              <button
                type="button"
                id="closePassengerModal"
                onClick={handlePassengerModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaPerson className="text-xl mr-1" />
                    Dewasa
                  </span>
                  <span className="text-sm text-slate-500">
                    (12 tahun keatas)
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    type="button"
                    id="decreaseAdult"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.dewasa <= 1}
                    onClick={() => handlePenumpang("dewasa", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.dewasa}
                  </span>
                  <button
                    type="button"
                    id="increaseAdult"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("dewasa", "i")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center my-3">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaChildDress className="text-xl mr-1" />
                    Anak
                  </span>
                  <span className="text-sm text-slate-500">(2 - 11 tahun)</span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    type="button"
                    id="decreaseChild"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.anak === 0}
                    onClick={() => handlePenumpang("anak", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.anak}
                  </span>
                  <button
                    type="button"
                    id="increaseChild"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("anak", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaBaby className="text-xl mr-1" />
                    Bayi
                  </span>
                  <span className="text-sm text-slate-500">
                    (Dibawah 2 tahun)
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    type="button"
                    id="decreaseBaby"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.bayi === 0}
                    onClick={() => handlePenumpang("bayi", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.bayi}
                  </span>
                  <button
                    type="button"
                    id="increaseBaby"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("bayi", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b ">
              <button
                type="button"
                id="savePassengers"
                onClick={handlePassengerModal}
                className="text-white bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PILIH TANGGAL PENERBANGAN */}

      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
          dateModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full ${
            isChecked ? "max-w-3xl" : "max-w-md"
          } max-h-full transform transition-transform duration-300 ease-in-out ${
            dateModalOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Pilih tanggal penerbangan
              </h3>
              <button
                type="button"
                id="closeDateModal"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                onClick={handleDateModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`p-4 flex flex-col items-center ${
                isChecked ? "" : "pt-0"
              }`}
            >
              {isChecked ? (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDate([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  minDate={new Date()}
                  rangeColors={["#2A629A", "#3472b0", "#003285"]}
                />
              ) : (
                <Calendar
                  value={departure_date}
                  onChange={handleSelectDate}
                  minDate={new Date()}
                  color="#2A629A"
                  date={departure_date}
                />
              )}
              <button
                type="button"
                id="saveDate"
                className="text-white inline-flex w-full justify-center bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleDateModal}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
