import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getTicket } from "../../../../redux/actions/ticket/ticketActions";
import OrderSummary from "./OrderSummary";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BiErrorCircle } from "react-icons/bi";
import Modal from "react-modal";
import "../../../../index.css";
import Navbar from "../../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../../assets/components/navigations/navbar/Navbar-mobile";
import { useMediaQuery } from "react-responsive";
import BtnScrollTop from "../../../../assets/components/BtnScrollUp";
import { setChoosenFlight } from "../../../../redux/reducers/flight/flightReducers";
import { setTicketSelected } from "../../../../redux/reducers/ticket/ticketReducers";
import { setPassengerDetails } from "../../../../redux/reducers/flight/bookingReducers";

export default function TicketCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useMediaQuery({ minWidth: 1024 });
  const query = new URLSearchParams(location.search);
  const adult = parseInt(query.get("adult"));
  const child = parseInt(query.get("child"));
  const infant = parseInt(query.get("infant"));
  const orderSummaryRef = useRef(null);
  const { choosenFlight } = useSelector((state) => state.flight);

  const { token } = useSelector((state) => state.login);
  const [isChecked, setIsChecked] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [timeUpModal, setTimeUpModal] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [penumpang, setPenumpang] = useState({
    dewasa: adult,
    anak: child,
    bayi: infant,
  });

  //State untuk form
  const [orderer, setOrderer] = useState({
    name: "",
    family_name: "",
    phone_number: "",
    email: "",
  });

  const [passengers, setPassengers] = useState([
    {
      title: "",
      name: "",
      email: "",
      passenger_type: "",
      phone_number: "",
      date_of_birth: "",
      nationality: "",
      identity_number: "",
      issuing_country: "",
      valid_until: "",
    },
  ]);

  // Fungsi untuk menyimpan kesalahan di form orderer
  const [ordererErrors, setOrdererErrors] = useState({
    name: "",
    family_name: "",
    phone_number: "",
  });

  // Fungsi untuk menyimpan kesalahan di form passenger
  const [passengerErrors, setPassengerErrors] = useState(
    passengers.map(() => ({
      name: "",
      phone_number: "",
      identity_number: "",
    }))
  );

  //Fungsi untuk mengupdate state ordered
  const handleOrdererChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
      if (value.length < 3) {
        error = "Nama minimal memiliki 3 huruf.";
      }
    }

    if (name === "family_name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
      if (value.length < 3) {
        error = "Nama keluarga minimal memiliki 3 huruf.";
      }
    }

    if (name === "phone_number") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      if (value.length < 8 || value.length > 14) {
        error = "Nomor ponsel harus memiliki 8-14 digit.";
      }
    }

    setOrderer({
      ...orderer,
      [name]: value,
    });
    setOrdererErrors({
      ...ordererErrors,
      [name]: error,
    });
  };

  //Fungsi untuk mengupdate state passengers
  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;

    if (index < 0 || index >= passengers.length) {
      return; // Keluar dari fungsi jika index tidak valid
    }

    const newPassengers = [...passengers];
    const newPassengerErrors = [...passengerErrors];

    let error = "";

    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
      if (value.length < 3) {
        error = "Nama minimal memiliki 3 huruf.";
      }
    }

    if (name === "phone_number") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      if (value.length < 8 || value.length > 14) {
        error = "Nomor ponsel harus memiliki 8-14 digit.";
      }
    }

    if (name === "identity_number") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      if (value.length !== 16) {
        error = "Nomor identitas harus tepat 16 digit.";
      }
    }

    if (name === "nationality") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
    }

    if (name === "issuing_country") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
    }

    // memastikan bahwa newPassengers[index] dan newPassengerErrors[index] ada
    if (!newPassengers[index]) {
      newPassengers[index] = {}; // Inisialisasi jika belum ada
    }
    if (!newPassengerErrors[index]) {
      newPassengerErrors[index] = {}; // Inisialisasi jika belum ada
    }

    newPassengers[index][name] = value;
    newPassengerErrors[index][name] = error;

    setPassengers(newPassengers);
    setPassengerErrors(newPassengerErrors);
  };

  // Fungsi untuk date of birth
  const handleDateBirth = (index, date) => {
    const newPassengers = [...passengers];
    newPassengers[index].date_of_birth = date;
    setPassengers(newPassengers);
  };

  // Fungsi untuk valid until
  const handleDateValidUntil = (index, date) => {
    const newPassengers = [...passengers];
    newPassengers[index].valid_until = date;
    setPassengers(newPassengers);
  };

  //Fungsi untuk validasi form
  const validateForm = () => {
    if (!orderer.name || !orderer.email || !orderer.phone_number) {
      return false;
    }

    for (let passenger of passengers) {
      if (
        !passenger.name ||
        !passenger.date_of_birth ||
        !passenger.nationality ||
        !passenger.identity_number ||
        !passenger.issuing_country ||
        !passenger.valid_until
      ) {
        return false;
      }
    }

    return true;
  };

  // Fungsi untuk toogle nama keluarga
  const handleToogle = () => {
    setIsChecked(!isChecked);
  };

  // Fungsi untuk menangani fokus input nama
  const handleNameFocus = () => {
    if (!isNameValid) {
      setIsNameValid(true);
    }
  };

  // Fungsi untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const hasOrdererErrors = Object.values(ordererErrors).some(
      (error) => error !== ""
    );
    const hasPassengerErrors = passengerErrors.some((passengerError) =>
      Object.values(passengerError).some((error) => error !== "")
    );

    if (hasOrdererErrors || hasPassengerErrors) {
      toast.error("Harap lengkapi semua data dengan benar", {
        icon: null,
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
      });
      return;
    }

    const { name, phone_number } = orderer;

    if (!name) {
      toast.error("Mohon masukkan nama Anda!", {
        icon: null,
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
      });
      return;
    }

    if (name.length < 3) {
      toast.error("Nama minimal memiliki 3 huruf!", {
        icon: null,
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
      });
      return;
    }

    if (!phone_number) {
      toast.error("Mohon masukkan nomor ponsel Anda!", {
        icon: null,
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
      });
      return;
    }

    if (phone_number.length < 8 || phone_number.length > 14) {
      toast.error("Nomor ponsel harus memiliki 8-14 digit!", {
        icon: null,
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
      });
      return;
    }

    const identityNumberErrors = passengers.map(
      (passenger) => passenger.identity_number.length !== 16
    );
    if (identityNumberErrors.includes(true)) {
      toast.error("Nomor identitas harus tepat 16 digit!", {
        icon: null,
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
      });
      return;
    }

    if (validateForm()) {
      const flightIds = choosenFlight.map((flight) => flight.flight_id);
      dispatch(
        getTicket(
          flightIds,
          penumpang.dewasa,
          penumpang.anak,
          penumpang.bayi,
          orderer,
          passengers
        )
      );
      setIsDataSaved(true);
      // Setelah menyimpan, mengarah ke tombol "Lanjut Pembayaran"
      if (orderSummaryRef.current) {
        orderSummaryRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const { ticket } = useSelector((state) => state.ticket);

  useEffect(() => {
    if (ticket) {
      dispatch(setTicketSelected(ticket));
      dispatch(setPassengerDetails(passengers));
    }
  }, [ticket]);

  // }, [passengers]);

  const handleLanjutPembayaran = () => {
    navigate(`/payment/${ticket?.booking_code}`);
  };

  //Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          setTimeUpModal(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, navigate]);

  //Modal Timer
  const closeTimeUpModal = () => {
    setTimeUpModal(false);
    navigate("/hasil-pencarian");
  };

  //form untuk sesuai dengan jumlah tiket
  useEffect(() => {
    const newPassengers = [];
    for (let i = 0; i < adult; i++) {
      newPassengers.push({
        title: "",
        name: "",
        email: "",
        passenger_type: "Dewasa",
        phone_number: "",
        date_of_birth: "",
        nationality: "",
        identity_number: "",
        issuing_country: "",
        valid_until: "",
      });
    }
    for (let i = 0; i < child; i++) {
      newPassengers.push({
        title: "",
        name: "",
        email: "",
        passenger_type: "Anak",
        phone_number: "",
        date_of_birth: "",
        nationality: "",
        identity_number: "",
        issuing_country: "",
        valid_until: "",
      });
    }
    for (let i = 0; i < infant; i++) {
      newPassengers.push({
        title: "",
        name: "",
        email: "",
        passenger_type: "Bayi",
        phone_number: "",
        date_of_birth: "",
        nationality: "",
        identity_number: "",
        issuing_country: "",
        valid_until: "",
      });
    }
    setPassengers(newPassengers);
  }, [adult, child, infant]);

  useEffect(() => {
    if (isLaptop) {
      if (isDataSaved) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [isDataSaved]);

  return (
    <div className="bg-[#FFF0DC]">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      {/* <Toaster /> */}
      <div className="p-3 my-10 pt-3">
        {/* Menampilkan modal waktu habis */}
        <Modal
          isOpen={timeUpModal}
          onRequestClose={() => setTimeUpModal(false)}
          contentLabel="Waktu Habis"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 w-24 h-24 text-[#2A629A]" />
            <h3 className="mb-5 text-lg font-normal text-[#8A8A8A]">
              Waktu telah berakhir!
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-[#86B6F6] hover:bg-[#2A629A] text-white font-medium px-4 py-2 rounded-lg"
                onClick={() => {
                  closeTimeUpModal(false);
                  window.location.href = "/";
                  dispatch(setChoosenFlight([]));
                }}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </Modal>

        <div className="p-3">
          {/* Countdown Bar */}
          <div
            className={`bg-[#FF0000] text-center p-4  text-white font-semibold fixed left-0 w-full z-10 ${
              isMobile
                ? "top-0 mt-0 text-sm"
                : isTablet
                ? "top-18"
                : isLaptop
                ? "top-14 mt-2"
                : ""
            }`}
          >
            Selesaikan dalam {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
            sebelum tiket kamu hangus!
          </div>

          <div
            className={`flex justify-between ${
              isMobile
                ? "pt-6 flex-col"
                : isTablet
                ? "pt-20 items-center"
                : isLaptop
                ? "pt-20 items-center"
                : ""
            }`}
          >
            {/* Menampilkan modal untuk kembali */}
            <div className="lg:w-1/12">
              <div
                className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3] cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                <IoIosArrowBack className="text-3xl" />
                <h6 className="text-lg">Kembali</h6>
              </div>
            </div>

            {/* STEPPER */}
            <nav className={`${isMobile ? "mx-5 mt-1" : ""}`}>
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <span className="flex items-center justify-center w-5 h-5 me-1 text-xs border bg-[#003285] text-white rounded-full shrink-0">
                    1
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-[#003285]">
                    Isi Data Diri
                  </span>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-[#003285] mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="flex items-center justify-center w-5 h-5 me-1 md:ms-2 text-xs border border-gray-500 text-gray-500 rounded-full shrink-0">
                      2
                    </span>
                    <span className="ms-1 text-sm text-gray-500 font-medium">
                      Bayar
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-500 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="flex items-center justify-center w-5 h-5 me-1 md:ms-2 text-xs border border-gray-500 text-gray-500 rounded-full shrink-0">
                      3
                    </span>
                    <span className="ms-1 text-sm text-gray-500 font-medium">
                      Selesai
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Tombol Kembali */}
          <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            contentLabel="Konfirmasi Kembali"
            className="custom-modal"
            overlayClassName="custom-overlay"
          >
            <div className="text-center flex flex-col items-center">
              {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
              <iframe src="https://lottie.host/embed/43cf72cb-f4cc-4491-a218-05d127d73ce1/RhKDgbsfaS.json"></iframe>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Apakah kamu yakin ingin keluar?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-[#FF0000] hover:bg-red-700 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setOpenModal(false);
                    window.location.href = "/";
                    dispatch(setChoosenFlight([]));
                  }}
                >
                  Ya, saya yakin
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  onClick={() => setOpenModal(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </Modal>

          {/* Form Data Akun */}
          <form onSubmit={handleSubmit}>
            <div
              className={`container mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6${
                isTablet ? "" : ""
              }`}
            >
              <div className="col-span-2 ">
                {/* Data Akun */}
                <div className="bg-white shadow-md rounded-xl p-6 max-w-[800px]">
                  <h1 className="text-xl text-center font-bold mb-4 text-[#003285]">
                    Isi Data Pemesan
                  </h1>
                  <div className="border border-[#8A8A8A] rounded-xl">
                    <h2 className="text-lg font-medium mb-4 text-white bg-[#2A629A] rounded-t-lg p-2">
                      <span className="ml-2">Data Diri Pemesan</span>
                    </h2>
                    <div className="ps-4 pe-4 mt-4">
                      <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="name"
                        onFocus={handleNameFocus}
                        value={orderer.name}
                        onChange={handleOrdererChange}
                        className="w-full p-2 border border-[#8A8A8A] rounded-xl text-sm focus:outline-none focus-within:border-[#2A629A] text-[#2A629A]"
                        placeholder="Nama lengkap sesuai KTP/identitas lainnya"
                        required
                      />
                      {ordererErrors.name && (
                        <p className="flex items-center text-[#FF0000] text-sm mt-1 text-left">
                          <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                          {ordererErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center ps-4 pe-4 mt-4">
                      <label className="text-[#2A629A] mr-2 text-sm font-medium">
                        Punya Nama Keluarga?
                      </label>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="family_name"
                          checked={isChecked}
                          onChange={handleToogle}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    {isChecked && (
                      <div className="ps-4 pe-4 mt-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Nama Keluarga
                        </label>
                        <input
                          type="text"
                          name="family_name"
                          value={orderer.family_name}
                          onChange={handleOrdererChange}
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none  text-[#2A629A]"
                          placeholder="Nama keluarga (opsional)"
                        />
                        {ordererErrors.family_name && (
                          <p className="flex items-center text-[#FF0000] text-sm mt-1 text-left">
                            <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                            {ordererErrors.family_name}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="ps-4 pe-4 mt-4">
                      <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={orderer.email}
                        onChange={handleOrdererChange}
                        className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none  text-[#2A629A]"
                        placeholder="Alamat Email"
                        required
                      />
                    </div>
                    <div className="ps-4 pe-4 mt-4 mb-4">
                      <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                        Nomor Ponsel
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        maxLength={12}
                        value={orderer.phone_number}
                        onChange={handleOrdererChange}
                        className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                        placeholder="08123456789"
                        required
                      />
                      {ordererErrors.phone_number && (
                        <p className="flex items-center text-[#FF0000] text-sm mt-1 text-left">
                          <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                          {ordererErrors.phone_number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Data Tiket */}
                <div className="bg-white shadow-md rounded-xl p-6 mt-6 space-y-6 max-w-[800px]">
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="border border-[#8A8A8A] rounded-xl"
                    >
                      <h3 className="text-lg font-medium mb-4 text-white bg-[#2A629A] rounded-t-lg p-2">
                        <span className="ml-2">
                          Isi Data Penumpang {index + 1}
                        </span>
                      </h3>
                      <div className="ps-4 pe-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Gelar
                        </label>
                        <div className="relative mb-4">
                          <select
                            name="title"
                            value={passenger.title}
                            onChange={(e) => handlePassengerChange(index, e)}
                            className="appearance-none w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A] py-2 pl-3 pr-10"
                            required
                          >
                            <option value="">Pilih Gelar</option>
                            <option className="text-[#2A629A]">Tuan</option>
                            <option className="text-[#2A629A]">Nyonya</option>
                            <option className="text-[#2A629A]">Nona</option>
                          </select>
                          <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#2A629A]">
                            <IoIosArrowDown />
                          </span>
                        </div>
                      </div>
                      <div className="ps-4 pe-4">
                        <label className="block text-[#2A629A]  mb-2 text-sm font-medium">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={passengers[index].name}
                          onChange={(e) => handlePassengerChange(index, e)}
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                          placeholder="Nama lengkap sesuai KTP/identitas lainnya"
                          required
                        />
                        {passengerErrors[index]?.name && (
                          <p className="flex items-center text-[#FF0000] text-sm mt-1 text-left">
                            <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                            {passengerErrors[index].name}
                          </p>
                        )}
                      </div>
                      <div className="ps-4 pe-4 mt-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          placeholder="Alamat Email"
                          value={passenger.email}
                          onChange={(e) => handlePassengerChange(index, e)}
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                          required
                        />
                      </div>
                      <div className="ps-4 pe-4 mt-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Nomor Ponsel
                        </label>
                        <input
                          type="tel"
                          name="phone_number"
                          maxLength={12}
                          value={passengers[index].phone_number}
                          onChange={(e) => handlePassengerChange(index, e)}
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                          placeholder="08123456789"
                          required
                        />
                        {passengerErrors[index]?.phone_number && (
                          <p className="flex items-center text-[#FF0000] text-sm mt-1 text-left">
                            <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                            {passengerErrors[index].phone_number}
                          </p>
                        )}
                      </div>
                      <div className="ps-4 pe-4 mt-4">
                        <div>
                          <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                            Tanggal Lahir
                          </label>
                          <DatePicker
                            selected={passenger.date_of_birth}
                            onChange={(date) => handleDateBirth(index, date)}
                            maxDate={new Date()}
                            placeholderText="mm/dd/yyyy"
                            className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            withPortal
                            portalId="root-portal"
                          />
                        </div>
                      </div>
                      <div className="ps-4 pe-4 mt-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Kewarganegaraan
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          value={passenger.nationality}
                          onChange={(e) => handlePassengerChange(index, e)}
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                          placeholder="Contoh: Indonesia"
                          required
                        />
                      </div>
                      <div className="ps-4 pe-4 mt-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Nomor Kartu Tanda Penduduk atau Paspor
                        </label>
                        <input
                          type="tel"
                          name="identity_number"
                          value={passengers[index].identity_number}
                          onChange={(e) => handlePassengerChange(index, e)}
                          maxLength={16}
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                          placeholder="357800030003000"
                          required
                        />
                        {passengerErrors[index]?.identity_number && (
                          <p className="flex items-center text-[#FF0000] text-sm mt-1 text-left">
                            <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                            {passengerErrors[index].identity_number}
                          </p>
                        )}
                      </div>
                      <div className="ps-4 pe-4 mt-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Negara Penerbit
                        </label>
                        <input
                          type="text"
                          name="issuing_country"
                          value={passenger.issuing_country}
                          onChange={(e) => handlePassengerChange(index, e)}
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                          placeholder="Contoh: Indonesia"
                          required
                        />
                      </div>
                      <div className="ps-4 pe-4 mt-4 mb-4">
                        <label className="block text-[#2A629A] mb-2 text-sm font-medium">
                          Berlaku Sampai
                        </label>
                        <DatePicker
                          selected={passenger.valid_until}
                          onChange={(date) => handleDateValidUntil(index, date)}
                          minDate={new Date()}
                          placeholderText="mm/dd/yyyy"
                          className="w-full p-2 border border-[#8A8A8A] rounded-xl focus-within:border-[#2A629A] text-sm focus:outline-none text-[#2A629A]"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          withPortal
                          portalId="root-portal"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    disabled={isDataSaved}
                    type="submit"
                    className={`w-full max-w-[800px] mt-6 inline-flex justify-center rounded-xl border-0 shadow-sm py-3 ${
                      isDataSaved
                        ? "bg-[#2A629A]/75"
                        : "bg-[#2A629A] hover:bg-[#003285]"
                    } font-medium text-white  focus:outline-none focus:ring-0`}
                  >
                    {isDataSaved ? "Data Tersimpan" : " Simpan"}
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div
                className={`col-span-1 ${
                  isMobile
                    ? "mx-auto w-full ms-3"
                    : isTablet
                    ? "col-span-2"
                    : ""
                }`}
              >
                <OrderSummary />
                {isDataSaved && (
                  <>
                    <button
                      onClick={handleLanjutPembayaran}
                      className="w-full inline-flex justify-center rounded-xl border-0 shadow-sm py-3 bg-[#28A745] font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-0"
                    >
                      Lanjut Bayar
                    </button>
                    <button
                      onClick={() => navigate("/riwayat-pemesanan")}
                      className="w-full inline-flex justify-center rounded-xl border-0 shadow-sm mt-3 py-3 bg-[#2A629A] font-medium text-white hover:bg-[#003285] focus:outline-none focus:ring-0"
                    >
                      Bayar Nanti
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
