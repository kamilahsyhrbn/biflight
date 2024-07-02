import React, { useState, useEffect, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Listbox, Transition } from "@headlessui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import {
  cancelTransactions,
  getTransactions,
  printTransactions,
} from "../../../redux/actions/flight/transactionActions";
import {
  addToRecentSearch,
  removeAllFromRecentSearch,
  removeFromRecentSearch,
} from "../../../redux/reducers/flight/transactionReducers";
import Loader from "../../../assets/components/Loader";

//ICON
import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io";
import { IoFilter, IoLocationSharp } from "react-icons/io5";
import { HiOutlineSelector } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { setTicketSelected } from "../../../redux/reducers/ticket/ticketReducers";
import { setPassengerDetails } from "../../../redux/reducers/flight/bookingReducers";

const filter = [
  { id: 1, status: "Semua" },
  { id: 2, status: "Berhasil" },
  { id: 3, status: "Belum dibayar" },
  { id: 4, status: "Batal" },
];

export default function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const { transactions, isLoading } = useSelector((state) => state.transaction);

  const { profile } = useSelector((state) => state.user);
  const email = profile?.email;
  const { recentSearch } = useSelector((state) => state.transaction);
  const userRecentSearches = recentSearch.filter(
    (search) => search.email === email
  );

  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // MODAL MENU PENCARIAN
  const [isSearchCodeOpen, setIsSearchCodeOpen] = useState(false); // MODAL PENCARIAN BERDASARKAN NOMOR PENERBANGAN
  const [isSearchDateOpen, setIsSearchDateOpen] = useState(false); // MODAL PENCARIAN BERDASARKAN TANGGAL TRANSAKSI
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // MODAL KONFIRMASI HAPUS RIWAYAT PENCARIAN KODE PENERBANGAN
  const [cancelModalOpen, setCancelModalOpen] = useState(false); // MODAL KONFIRMASI MEMBATALKAN PEMESANAN TIKET PENERBANGAN
  const [isBannerShow, setIsBannerShow] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [query, setQuery] = useState("");
  const [lt, setLt] = useState("");
  const [gte, setGte] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    dispatch(getTransactions(lt, gte, query));
  }, [dispatch]);

  // UNTUK MODAL PENCARIAN
  const handleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  // FUNGSI UNTUK MENGUBAH DURASI PENERBANGAN
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}j${hours > 1 ? "" : ""} ${remainingMinutes}m${
      remainingMinutes > 1 ? "" : ""
    }`;
  }

  // FUNGSI UNTUK MENAMPILKAN DETAIL TIKET PENERBANGAN
  const handleSelectTicket = (transaction) => {
    setSelectedTicket(transaction);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (transaction?.status === "BELUM DIBAYAR") {
      setIsBannerShow(true);
    } else {
      setIsBannerShow(false);
    }
  };

  // FUNGSI UNTUK MENAMPILKAN RIWAYAT PEMESANAN TIKET BERDASARKAN FILTER
  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedFilter?.status === "Semua") return true;
    if (
      selectedFilter?.status === "Berhasil" &&
      transaction?.status === "BERHASIL"
    )
      return true;
    if (
      selectedFilter?.status === "Belum dibayar" &&
      transaction?.status === "BELUM DIBAYAR"
    )
      return true;
    if (selectedFilter?.status === "Batal" && transaction?.status === "BATAL")
      return true;
    return false;
  });

  // FUNGSI UNTUK MENAMPILKAN MODAL PENCARIAN BERDASARKAN NOMOR PENERBANGAN
  const handleSearchCodeModal = () => {
    setIsSearchCodeOpen(!isSearchCodeOpen);
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  // FUNGSI UNTUK MENAMPILKAN MODAL PENCARIAN BERDASARKAN TANGGAL TRANSAKSI
  const handleSearchDateModal = () => {
    setIsSearchDateOpen(!isSearchDateOpen);
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  // FUNGSI UNTUK SUBMIT HASIL PENCARIAN BERDASARKAN TANGGAL TRANSAKSI
  const handleSubmitDate = (e) => {
    e?.preventDefault();

    const lessThan = format(new Date(date[0].endDate), "yyyy-MM-dd");
    const greaterThan = format(new Date(date[0].startDate), "yyyy-MM-dd");

    setLt(lessThan);
    setGte(greaterThan);

    if (lessThan === greaterThan) {
      dispatch(getTransactions("", greaterThan, ""));
    } else {
      dispatch(getTransactions(lessThan, greaterThan, ""));
    }
    setIsSearchDateOpen(false);
    setIsSearchModalOpen(false);
    setSelectedTicket([]);
    setSearchButton(true);
    setQuery("");
  };

  // FUNGSI UNTUK SUBMIT HASIL PENCARIAN BERDASARKAN KODE PENERBANGAN
  const handleSubmitCode = (e) => {
    e?.preventDefault();

    if (!query) {
      toast("Harap masukkan nomor penerbangan Anda!", {
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

    dispatch(getTransactions("", "", query));
    dispatch(addToRecentSearch({ email, query }));
    setIsSearchCodeOpen(false);
    setIsSearchModalOpen(false);
    setSelectedTicket([]);
    setSearchButton(true);
    setLt("");
    setGte("");
  };

  // FUNGSI UNTUK MENGHAPUS SEMUA RIWAYAT PENCARIAN NOMOR PENERBANGAN
  const handleRemoveAll = () => {
    dispatch(removeAllFromRecentSearch(email));
    handleConfirmModalToggle(); // MENUTUP MODAL
  };

  // FUNGSI UNTUK MENGHAPUS SALAH SATU RIWAYAT PENCARIAN NOMOR PENERBANGAN
  const handleRemove = (index) => {
    dispatch(removeFromRecentSearch(index));
  };

  // FUNGSI UNTUK MENAMPILKAN MODAL CONFIRM HAPUS
  const handleConfirmModalToggle = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  // FUNGSI UNTUK MENAMPILKAN MODAL PEMBATALAN PEMESANAN TIKET
  const handleCancelModalToggle = () => {
    setCancelModalOpen(!cancelModalOpen);
  };

  // FUNGSI UNTUK MENGHAPUS PENCARIAN
  const handleClearSearch = () => {
    dispatch(getTransactions("", "", ""));
    setSelectedTicket([]);
    setQuery("");
    setLt("");
    setGte("");
    setSearchButton(false);
  };

  // FUNGSI UNTUK MEMASUKKAN RIWAYAT PENCARIAN KE INPUT
  const handleSearchClick = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleCancelTransactions = () => {
    dispatch(cancelTransactions(selectedTicket?.booking_code)).then(() => {
      // Setelah pembaruan, ambil data transaksi terbaru
      dispatch(getTransactions(lt, gte, query));
    });
    handleCancelModalToggle(false);
    setSelectedTicket([]);
  };

  const handlePayment = () => {
    if (selectedTicket) {
      dispatch(setTicketSelected(selectedTicket));
      navigate(`/payment/${selectedTicket?.booking_code}`);
      dispatch(setPassengerDetails());
    }
  };

  useEffect(() => {
    if (selectedTicket?.status === "BELUM DIBAYAR") {
      setIsBannerShow(true);
    } else {
      setIsBannerShow(false);
    }
  }, [selectedTicket]);

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      <div>
        {isMobile ? <NavbarMobile /> : <Navbar />}
        <Toaster />
        {selectedTicket?.status === "BELUM DIBAYAR" && (
          <div
            className={`fixed flex bg-[#FF0000] text-white py-2 px-4 text-center w-full z-10 transition-transform duration-300 ease-in-out ${
              isMobile ? "top-0" : " mt-7"
            } ${isBannerShow ? "translate-y-0" : "-translate-y-full"}`}
          >
            <div className="flex items-center mx-auto">
              <p className="flex items-center text-base font-medium text-white">
                <span>
                  Selesaikan Pembayaran Anda Sebelum{" "}
                  {format(
                    new Date(selectedTicket?.expired_at),
                    "d MMMM yyyy HH:mm",
                    { locale: idLocale }
                  )}{" "}
                  WIB
                </span>
              </p>
            </div>
            <div className="flex items-center">
              <button
                data-dismiss-target="#sticky-banner"
                type="button"
                className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                onClick={() => setIsBannerShow(false)}
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
                <span className="sr-only">Close banner</span>
              </button>
            </div>
          </div>
        )}
        <div className="m-5 mt-10 md:m-10 md:py-20">
          {/* BACK BUTTON AND TOASTER */}
          <div>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 mb-6">
              <div className={`${isMobile ? "hidden" : "lg:w-1/12"}`}>
                <Link to="/">
                  <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
                    <IoIosArrowBack className="text-3xl" />
                    <h6 className="text-lg">Kembali</h6>
                  </div>
                </Link>
              </div>
              <div className="text-center flex-1">
                <h5 className="text-3xl font-medium text-[#003285]">
                  Riwayat Pemesanan
                </h5>
              </div>

              {/* BUTTON FILTER STATUS TRANSAKSI*/}
              <div className="flex items-center">
                <div className="flex items-center">
                  <Listbox value={selectedFilter} onChange={setSelectedFilter}>
                    {({ open }) => (
                      <>
                        <div className="mt-1 relative w-48">
                          <Listbox.Button className="flex items-center border-[#003285] border-2 py-2 px-3 w-full rounded-full">
                            <span className="truncate flex items-center">
                              <IoFilter className="mr-1 text-xl" />
                              {selectedFilter.status}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <HiOutlineSelector
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {filter?.map((filtered) => (
                                <Listbox.Option
                                  key={filtered.id}
                                  className={({ active }) =>
                                    `${
                                      active
                                        ? "text-white bg-[#2A629A]"
                                        : "text-gray-900"
                                    }
                                      cursor-default select-none relative py-2 pl-3 pr-9
                                    `
                                  }
                                  value={filtered}
                                >
                                  {({ selectedFilter, active }) => (
                                    <>
                                      <span
                                        className={`
                                          ${
                                            selectedFilter
                                              ? "font-semibold"
                                              : "font-normal"
                                          }
                                          block whitespace-nowrap
                                        `}
                                      >
                                        {filtered.status}
                                      </span>

                                      {selectedFilter ? (
                                        <span
                                          className={`
                                      ${
                                        active ? "text-white" : "text-[#2A629A]"
                                      }
                                      absolute inset-y-0 right-0 flex items-center pr-4
                                    `}
                                        >
                                          <IoMdCheckmark
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>

                {/* BUTTON SEARCH */}
                <div className="ml-3">
                  <button className="pt-1 w-full" onClick={handleSearchModal}>
                    <RiSearchLine className="text-3xl text-[#003285]" />
                  </button>
                </div>
              </div>
            </div>
            {searchButton ? (
              <div
                className={`flex mb-2 ${
                  isMobile || isTablet
                    ? "flex-col gap-2 items-end"
                    : "flex-row justify-between items-center"
                }`}
              >
                <div>
                  {query && !lt && !gte ? (
                    <h5 className="font-medium text-[#003285] text-xl text-center">
                      Hasil pencarian "{query}"
                    </h5>
                  ) : (
                    <h5 className="font-medium text-[#003285] text-xl text-center">
                      Hasil pencarian dari tanggal{" "}
                      {new Date(gte).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      hingga{" "}
                      {new Date(lt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </h5>
                  )}
                </div>
                <button
                  type="button"
                  className="py-2 px-10 rounded-lg bg-[#2A629A] text-white hover:bg-[#3472b0] w-56 "
                  onClick={handleClearSearch}
                >
                  <div className="flex items-center font-medium">
                    <span className="text-md">Hapus Pencarian</span>
                  </div>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* JIKA BELUM ADA RIWAYAT PEMESANAN */}
          {filteredTransactions?.length === 0 ? (
            <div className="flex flex-col items-center my-10">
              <div className="flex flex-col items-center">
                <iframe src="https://lottie.host/embed/d3072280-f0c3-4850-9067-359d9d6b5744/V9wwvXaroH.json"></iframe>
                {query || lt || gte ? (
                  <div>
                    <h5 className="text-[#003285] text-2xl font-medium text-center">
                      Hasil pencarian tidak ditemukan
                    </h5>
                  </div>
                ) : (
                  <div>
                    <h5 className="text-[#003285] text-xl font-medium text-center">
                      Anda belum memiliki riwayat pesanan.
                    </h5>
                    <p className="text-[#003285] text-sm font-medium text-center">
                      Silahkan lakukan pemesanan dan temukan perjalanan yang
                      seru!
                    </p>
                    <Link to="/">
                      <button className="bg-[#003285] text-white rounded-lg shadow-md px-4 py-2 mt-3 w-full">
                        Cari Penerbangan
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // JIKA ADA RIWAYAT PEMESANAN
            <>
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <div className="flex flex-col-reverse lg:flex-row justify-center gap-14 overflow-hidden">
                  <div>
                    {filteredTransactions
                      ?.sort((a, b) => b.transaction_id - a.transaction_id)
                      .map((transaction) => (
                        <div
                          className={`${
                            selectedTicket?.transaction_id ===
                            transaction?.transaction_id
                              ? " border-[#003285] border-2"
                              : ""
                          }
                  bg-white shadow-lg p-6 rounded-xl my-3`}
                          key={transaction?.transaction_id}
                          onClick={() => handleSelectTicket(transaction)}
                        >
                          <div className="flex justify-between items-center">
                            {transaction?.return_flight ? (
                              <div>
                                <span className="bg-[#40A2E3] text-white py-2 px-4 rounded-full">
                                  Pulang-Pergi
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span className="bg-[#2A629A] text-white py-2 px-4 rounded-full">
                                  Sekali Jalan
                                </span>
                              </div>
                            )}
                            {transaction?.status === "BERHASIL" && (
                              <span className="bg-[#28A745] text-white py-2 px-4 rounded-full">
                                {transaction?.status}
                              </span>
                            )}
                            {transaction?.status === "BELUM DIBAYAR" && (
                              <span className="bg-[#FF0000] text-white py-2 px-4 rounded-full">
                                {transaction?.status}
                              </span>
                            )}
                            {transaction?.status === "BATAL" && (
                              <span className="bg-[#8A8A8A] text-white py-2 px-4 rounded-full">
                                {transaction?.status}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col mt-6 gap-4">
                            <div className="flex justify-between items-center gap-0">
                              <div className="flex">
                                <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                                <div>
                                  <h5 className="text-xl font-medium">
                                    {
                                      transaction?.departure_flight
                                        ?.departure_city
                                    }
                                  </h5>
                                  <div className="flex flex-col">
                                    <time className="text-sm">
                                      {new Date(
                                        transaction?.departure_flight?.flight_date
                                      ).toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </time>
                                    <time className="text-sm">
                                      {
                                        transaction?.departure_flight
                                          ?.departure_time
                                      }
                                    </time>
                                  </div>
                                </div>
                              </div>
                              <div className="border-b-2 border-[#003285] lg:w-[35vh] md:w-[35vh]  text-center text-sm">
                                <time>
                                  {formatDuration(
                                    transaction?.departure_flight?.duration
                                  )}
                                </time>
                              </div>
                              <div className="flex">
                                <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                                <div>
                                  <h5 className="text-xl font-medium">
                                    {
                                      transaction?.departure_flight
                                        ?.arrival_city
                                    }
                                  </h5>
                                  <div className="flex flex-col">
                                    <time className="text-sm">
                                      {new Date(
                                        transaction?.departure_flight?.flight_date
                                      ).toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </time>
                                    <time className="text-sm">
                                      {
                                        transaction?.departure_flight
                                          ?.arrival_time
                                      }
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* JIKA TIKET PULANG-PERGI */}
                            {transaction?.return_flight && (
                              <div className="flex justify-between items-center gap-3">
                                <div className="flex">
                                  <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                                  <div>
                                    <h5 className="text-xl font-medium">
                                      {
                                        transaction?.return_flight
                                          ?.departure_city
                                      }
                                    </h5>
                                    <div className="flex flex-col">
                                      <time className="text-sm">
                                        {new Date(
                                          transaction?.return_flight?.flight_date
                                        ).toLocaleString("id-ID", {
                                          day: "2-digit",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                      </time>
                                      <time className="text-sm">
                                        {
                                          transaction?.return_flight
                                            ?.departure_time
                                        }
                                      </time>
                                    </div>
                                  </div>
                                </div>
                                <div className="border-b-2 border-[#003285] lg:w-[35vh] md:w-[35vh] text-center text-sm">
                                  <time>
                                    {formatDuration(
                                      transaction?.return_flight?.duration
                                    )}
                                  </time>
                                </div>
                                <div className="flex">
                                  <IoLocationSharp className="text-2xl font-extrabold text-[#003285]" />
                                  <div>
                                    <h5 className="text-xl font-medium">
                                      {transaction?.return_flight?.arrival_city}
                                    </h5>
                                    <div className="flex flex-col">
                                      <time className="text-sm">
                                        {new Date(
                                          transaction?.return_flight?.flight_date
                                        ).toLocaleString("id-ID", {
                                          day: "2-digit",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                      </time>
                                      <time className="text-sm">
                                        {
                                          transaction?.return_flight
                                            ?.arrival_time
                                        }
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <hr />
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                              <div className="flex flex-col">
                                <h5 className="font-medium">
                                  Nomor Penerbangan:
                                </h5>
                                <p>{transaction?.booking_code}</p>
                              </div>
                              <div className="flex flex-col">
                                <h5 className="font-medium">Class:</h5>
                                <p>
                                  {transaction?.departure_flight?.class}{" "}
                                  {transaction?.return_flight?.class
                                    ? `/ ${transaction?.return_flight?.class}`
                                    : ""}
                                </p>
                              </div>
                              <h4 className="text-lg font-semibold text-[#003285]">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(transaction?.total_price)}
                              </h4>
                            </div>
                            <hr />
                            <div className="flex">
                              <p className="font-medium">Tanggal Pemesanan: </p>
                              <time className="ml-2">
                                {transaction?.transaction_date}
                              </time>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="lg:w-2/5">
                    {/* CARD DETAIL TIKET */}
                    <div className="bg-white shadow-lg p-6 rounded-xl my-3">
                      {selectedTicket.length === 0 ? (
                        <div>
                          <h4 className="text-[#003285] font-semibold text-center">
                            Silahkan pilih tiket yang ingin Anda lihat detailnya
                          </h4>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center gap-3 mb-2">
                            <h4 className="text-xl text-[#003285] font-semibold">
                              Detail Pesanan
                            </h4>
                            {selectedTicket?.status === "BERHASIL" && (
                              <span className="bg-[#28A745] text-white py-2 px-4 rounded-full text-sm">
                                {selectedTicket?.status}
                              </span>
                            )}
                            {selectedTicket?.status === "BELUM DIBAYAR" && (
                              <span className="bg-[#FF0000] text-white py-2 px-4 rounded-full text-sm">
                                {selectedTicket?.status}
                              </span>
                            )}
                            {selectedTicket?.status === "BATAL" && (
                              <span className="bg-[#8A8A8A] text-white py-2 px-4 rounded-full text-sm">
                                {selectedTicket?.status}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center my-4">
                            <div className="">
                              <h5>Tanggal Pemesanan: </h5>
                              <p className="text-[#003285] font-semibold">
                                <time>{selectedTicket?.transaction_date}</time>
                              </p>
                            </div>
                            <div className="">
                              <h5>Nomor Penerbangan: </h5>
                              <p className="text-[#003285] font-semibold">
                                {selectedTicket?.booking_code}
                              </p>
                            </div>
                          </div>
                          {selectedTicket?.return_flight && (
                            <div className="flex mb-4">
                              <h5 className="font-medium py-0.5 px-5 rounded-lg bg-[#86B6F6] text-white">
                                Pergi
                              </h5>
                            </div>
                          )}
                          <div className="flex flex-row gap-3">
                            <div className="flex flex-col justify-between items-center">
                              <div className="flex flex-col text-center mt-1.5">
                                <time className="mb-1 text-lg font-semibold leading-none">
                                  {
                                    selectedTicket?.departure_flight
                                      ?.departure_time
                                  }
                                </time>
                                <div className="text-sm">
                                  {new Date(
                                    selectedTicket?.departure_flight?.flight_date
                                  ).toLocaleString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </div>
                              </div>
                              <div className="flex-grow"></div>
                              <div className="flex items-center justify-center">
                                <span className="text-sm">
                                  {formatDuration(
                                    selectedTicket?.departure_flight?.duration
                                  )}
                                </span>
                              </div>
                              <div className="flex-grow"></div>
                              <div className="flex flex-col text-center mt-1.5">
                                <time className="mb-1 text-lg font-semibold leading-none">
                                  {
                                    selectedTicket?.departure_flight
                                      ?.arrival_time
                                  }
                                </time>
                                <div className="text-sm">
                                  {new Date(
                                    selectedTicket?.departure_flight?.flight_date
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
                                    {
                                      selectedTicket?.departure_flight
                                        ?.departure_airport
                                    }
                                  </h3>
                                  <p className="mb-4 text-sm">
                                    {
                                      selectedTicket?.departure_flight
                                        ?.departure_terminal
                                    }
                                  </p>
                                </li>
                                <li className="mb-5 ms-4 flex flex-col gap-1">
                                  <div className="flex items-center">
                                    <p>
                                      {
                                        selectedTicket?.departure_flight
                                          ?.airline
                                      }
                                    </p>
                                  </div>
                                  {selectedTicket?.passengers?.map(
                                    (passenger, i) => {
                                      const index = i + 1;
                                      return (
                                        <div key={passenger?.passenger_id}>
                                          <h5 className="text-[#003285]">
                                            Penumpang {index}:{" "}
                                            {passenger?.title} {passenger?.name}
                                          </h5>
                                          <p>ID: {passenger?.passenger_id}</p>
                                        </div>
                                      );
                                    }
                                  )}
                                </li>
                                <li className="ms-4">
                                  <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                                  <h3 className="text-lg font-semibold">
                                    {
                                      selectedTicket?.departure_flight
                                        ?.arrival_airport
                                    }
                                  </h3>
                                </li>
                              </ol>
                              <div className="ms-4">
                                <p className="text-sm">
                                  {
                                    selectedTicket?.departure_flight
                                      ?.arrival_terminal
                                  }
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* JIKA PULANG-PERGI */}
                          {selectedTicket?.return_flight && (
                            <div>
                              <div className="flex my-4">
                                <h5 className="font-medium py-0.5 px-3 rounded-lg bg-[#86B6F6] text-white">
                                  Pulang
                                </h5>
                              </div>
                              <div className="flex flex-row gap-3">
                                <div className="flex flex-col justify-between items-center">
                                  <div className="flex flex-col text-center mt-1.5">
                                    <time className="mb-1 text-lg font-semibold leading-none">
                                      {
                                        selectedTicket?.return_flight
                                          ?.departure_time
                                      }
                                    </time>
                                    <div className="text-sm">
                                      {new Date(
                                        selectedTicket?.return_flight?.flight_date
                                      ).toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </div>
                                  </div>
                                  <div className="flex-grow"></div>
                                  <div className="flex items-center justify-center">
                                    <span className="text-sm">
                                      {formatDuration(
                                        selectedTicket?.return_flight?.duration
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex-grow"></div>
                                  <div className="flex flex-col text-center mt-1.5">
                                    <time className="mb-1 text-lg font-semibold leading-none">
                                      {
                                        selectedTicket?.return_flight
                                          ?.arrival_time
                                      }
                                    </time>
                                    <div className="text-sm">
                                      {new Date(
                                        selectedTicket?.return_flight?.flight_date
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
                                        {
                                          selectedTicket?.return_flight
                                            ?.departure_airport
                                        }
                                      </h3>
                                      <p className="mb-4 text-sm">
                                        {
                                          selectedTicket?.return_flight
                                            ?.departure_terminal
                                        }
                                      </p>
                                    </li>
                                    <li className="mb-5 ms-4 flex flex-col gap-1">
                                      <div className="flex items-center">
                                        <p>
                                          {
                                            selectedTicket?.return_flight
                                              ?.airline
                                          }
                                        </p>
                                      </div>
                                      {selectedTicket?.passengers?.map(
                                        (passenger, i) => {
                                          const index = i + 1;
                                          return (
                                            <div key={passenger?.passenger_id}>
                                              <h5 className="text-[#003285]">
                                                Penumpang {index}:{" "}
                                                {passenger?.title}{" "}
                                                {passenger?.name}
                                              </h5>
                                              <p>
                                                ID: {passenger?.passenger_id}
                                              </p>
                                            </div>
                                          );
                                        }
                                      )}
                                    </li>
                                    <li className="ms-4">
                                      <div className="absolute w-3 h-3 bg-[#2A629A] rounded-full mt-1.5 -start-1.5 border border-white"></div>
                                      <h3 className="text-lg font-semibold">
                                        {
                                          selectedTicket?.return_flight
                                            ?.arrival_airport
                                        }
                                      </h3>
                                    </li>
                                  </ol>
                                  <div className="ms-4">
                                    <p className="text-sm">
                                      {
                                        selectedTicket?.return_flight
                                          ?.arrival_terminal
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="my-4 py-3 border-y-2">
                            <h5 className="font-semibold ">Rincian Harga</h5>
                            <div className="flex justify-between">
                              <div>
                                {selectedTicket?.total_adult !== 0 && (
                                  <p>{selectedTicket?.total_adult} Dewasa</p>
                                )}
                                {selectedTicket?.total_children !== 0 && (
                                  <p>{selectedTicket?.total_children} Anak</p>
                                )}
                                {selectedTicket?.total_baby !== 0 && (
                                  <p>{selectedTicket?.total_baby} Bayi</p>
                                )}
                                <p>Total Sebelum Pajak</p>
                                <p>Pajak (10%)</p>
                                <p>Total Setelah Pajak</p>
                              </div>
                              <div>
                                {selectedTicket?.total_adult !== 0 && (
                                  <div>
                                    {selectedTicket?.return_flight ? (
                                      <p>
                                        {new Intl.NumberFormat("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        }).format(
                                          selectedTicket?.total_adult *
                                            (selectedTicket?.departure_flight
                                              ?.price +
                                              selectedTicket?.return_flight
                                                ?.price)
                                        )}
                                      </p>
                                    ) : (
                                      <p>
                                        {new Intl.NumberFormat("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        }).format(
                                          selectedTicket?.total_adult *
                                            selectedTicket?.departure_flight
                                              ?.price
                                        )}
                                      </p>
                                    )}
                                  </div>
                                )}
                                {selectedTicket?.total_children !== 0 && (
                                  <div>
                                    {selectedTicket?.return_flight ? (
                                      <p>
                                        {new Intl.NumberFormat("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        }).format(
                                          selectedTicket?.total_children *
                                            (selectedTicket?.departure_flight
                                              ?.price +
                                              selectedTicket?.return_flight
                                                ?.price)
                                        )}
                                      </p>
                                    ) : (
                                      <p>
                                        {new Intl.NumberFormat("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        }).format(
                                          selectedTicket?.total_children *
                                            selectedTicket?.departure_flight
                                              ?.price
                                        )}
                                      </p>
                                    )}
                                  </div>
                                )}
                                {selectedTicket?.total_baby !== 0 && (
                                  <div>
                                    {selectedTicket?.return_flight ? (
                                      <p>
                                        {new Intl.NumberFormat("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        }).format(
                                          selectedTicket?.total_baby *
                                            (selectedTicket?.departure_flight
                                              ?.baby_price +
                                              selectedTicket?.return_flight
                                                ?.baby_price)
                                        )}
                                      </p>
                                    ) : (
                                      <p>
                                        {new Intl.NumberFormat("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        }).format(
                                          selectedTicket?.total_baby *
                                            selectedTicket?.departure_flight
                                              ?.baby_price
                                        )}
                                      </p>
                                    )}
                                  </div>
                                )}
                                <p>
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(selectedTicket?.total_before_tax)}
                                </p>
                                <p>
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(selectedTicket?.tax)}
                                </p>
                                <p>
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(selectedTicket?.total_price)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between font-semibold text-xl text-[#003285]">
                            <h5>Total Harga</h5>
                            <h5>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(selectedTicket?.total_price)}
                            </h5>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      {selectedTicket?.status === "BERHASIL" && (
                        <button
                          onClick={() =>
                            dispatch(
                              printTransactions(selectedTicket?.booking_code)
                            )
                          }
                          className="mt-4 w-full inline-flex justify-center rounded-xl border-0 shadow-sm py-3 bg-[#2A629A] font-medium text-white hover:bg-[#003285] focus:outline-none focus:ring-0"
                        >
                          Cetak Tiket
                        </button>
                      )}
                      {selectedTicket?.status === "BELUM DIBAYAR" && (
                        <div>
                          <button
                            onClick={handlePayment}
                            className="mt-4 w-full inline-flex justify-center rounded-xl border-0 shadow-sm py-3 bg-[#28A745] font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-0"
                          >
                            Lanjut Bayar
                          </button>
                          <button
                            onClick={handleCancelModalToggle}
                            className="mt-4 w-full inline-flex justify-center rounded-xl border-0 shadow-sm py-3 bg-[#FF0000] font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-0"
                          >
                            Batalkan Pemesanan
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* MODAL MENU PENCARIAN */}
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
            isSearchModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative p-4 w-full max-w-3xl max-h-full transform transition-transform duration-300 ease-in-out ${
              isSearchModalOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Cari Riwayat Pemesanan Berdasarkan
                </h3>
                <button
                  className=" bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleSearchModal}
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
              <div className="flex flex-col md:flex-row p-6 gap-3 justify-center items-center">
                <div onClick={handleSearchCodeModal} className="cursor-pointer">
                  <div className="border-2 rounded-lg flex flex-col items-center p-2">
                    <iframe src="https://lottie.host/embed/72132a09-da5e-4a3a-8feb-12578f19460b/O2UwvcCC5S.json"></iframe>
                    <h5 className="text-xl font-medium text-[#003285]">
                      Nomor Penerbangan
                    </h5>
                  </div>
                </div>
                <div onClick={handleSearchDateModal} className="cursor-pointer">
                  <div className="border-2 rounded-lg flex flex-col items-center p-2">
                    <iframe src="https://lottie.host/embed/0ca4c8c8-3f0d-4340-a5b9-f3634e51687c/I0PxXV0ARf.json"></iframe>
                    <h5 className="text-xl font-medium text-[#003285]">
                      Tanggal Transaksi
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL PENCARIAN BERDASARKAN KODE PENERBANGAN */}
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
            isSearchCodeOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative p-4 w-full max-w-lg max-h-full transform transition-transform duration-300 ease-in-out ${
              isSearchCodeOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Masukkan Nomor Penerbangan Anda
                </h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleSearchCodeModal}
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

              <div className="p-5 pt-0">
                <div className="flex flex-col">
                  <div className="my-3 w-full">
                    <form>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="search"
                          id="bookingCode"
                          className="block w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-0 focus:outline-none focus:border-[#2A629A]"
                          placeholder="Masukkan Nomor Penerbangan"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  {userRecentSearches.length === 0 ? (
                    <div>
                      <h5 className="text-center my-2 text-[#003285]">
                        Anda belum memiliki riwayat pencarian
                      </h5>
                    </div>
                  ) : (
                    <div className="flex justify-between mt-2">
                      <h5 className="text-lg font-medium text-[#003285]">
                        Pencarian Terkini
                      </h5>
                      <button
                        onClick={handleConfirmModalToggle}
                        className="text-[#FF0000] hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                  {userRecentSearches.map((search, index) => (
                    <div
                      className="mt-5 flex justify-between border-b-2 cursor-pointer"
                      key={index}
                    >
                      <p
                        onClick={() => handleSearchClick(search?.query)}
                        className="w-full"
                      >
                        {search?.query}
                      </p>
                      <button
                        onClick={() => handleRemove(index)}
                        className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
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
                  ))}
                  <button
                    className="text-white mt-5 inline-flex w-full justify-center bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleSubmitCode}
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL PENCARIAN BERDASARKAN TANGGAL TRANSAKSI */}
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
            isSearchDateOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative p-4 w-full max-w-lg max-h-full transform transition-transform duration-300 ease-in-out ${
              isSearchDateOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="relative bg-white w-full rounded-lg shadow">
              <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Pilih tanggal transaksi
                </h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleSearchDateModal}
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

              <div className="p-5 pt-0 my-5">
                <div className="flex flex-col items-center ">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    maxDate={new Date()}
                    rangeColors={["#2A629A", "#3472b0", "#003285"]}
                  />

                  <button
                    className="text-white inline-flex w-full justify-center bg-[#2A629A] hover:bg-[#3472b0] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleSubmitDate}
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL KONFIRMASI MENGHAPUS SEMUA RIWAYAT PENCARIAN KODE PENERBANGAN */}
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
            confirmModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative p-4 w-full max-w-3xl max-h-full transform transition-transform duration-300 ease-in-out ${
              confirmModalOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={handleConfirmModalToggle} // MENUTUP MODAL
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
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Apakah Anda yakin ingin menghapus semua riwayat pencarian?
                </h3>
                <button
                  onClick={handleConfirmModalToggle} // MENUTUP MODAL
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#003285] focus:z-10 focus:ring- "
                >
                  Batal
                </button>
                <button
                  onClick={handleRemoveAll}
                  className="text-white ms-3 bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL KONFIRMASI MEMBATALKAN PEMESANAN TIKET PENERBANGAN */}
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
            cancelModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative p-4 w-full max-w-3xl max-h-full transform transition-transform duration-300 ease-in-out ${
              cancelModalOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center mt-1"
                onClick={handleCancelModalToggle} // MENUTUP MODAL
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
              <div className="p-4 md:p-5 text-center flex flex-col items-center">
                <h3 className="text-lg font-normal text-gray-500">
                  Apakah Anda yakin ingin membatalkan pesanan tiket penerbangan
                  ini?
                </h3>
                <iframe src="https://lottie.host/embed/43cf72cb-f4cc-4491-a218-05d127d73ce1/RhKDgbsfaS.json"></iframe>
                <div className="flex items-center">
                  <button
                    onClick={handleCancelModalToggle} // MENUTUP MODAL
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#003285] focus:z-10 focus:ring-0"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handleCancelTransactions}
                    className="text-white ms-3 bg-red-600 hover:bg-red-800 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-9 py-2.5 text-center"
                  >
                    Ya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMobile ? "" : <BtnScrollTop />}
        <Footer />
      </div>
    </div>
  );
}
