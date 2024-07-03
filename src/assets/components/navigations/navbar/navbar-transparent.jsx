import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import { TbUser } from "react-icons/tb";
import { FiLogIn } from "react-icons/fi";
import Logobiflight from "../../../images/logobiflight.png";
import { IoMdNotifications, IoMdLogOut } from "react-icons/io";
import { PiEyes } from "react-icons/pi";
import { logout } from "../../../../redux/actions/auth/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../redux/actions/user/userActions";
import { getNotification } from "../../../../redux/actions/flight/notificationActions";
import { HiOutlineTicket } from "react-icons/hi2";

export default function NavbarTransparent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false); // BUAT VALIDASI WARNA NAVBAR
  const [showDropdownProfile, setShowDropdownProfile] = useState(false); // BUAT NAMPILIN DROPDOWN MENU PROFIL
  const [showDropdownNotification, setShowDropdownNotification] =
    useState(false); // BUAT NAMPILIN DROPDOWN NOTIFICATION IN APP
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // BUAT MODAL LOGOUT
  const { isLoggedIn } = useSelector((state) => state.login); // VALIDASI TAMPILAN NAVBAR
  const { profile } = useSelector((state) => state.user); // MENAMPILKAN DATA USER
  const { notifikasi } = useSelector((state) => state.notification); // UNTUK JUMLAH NOTIFIKASI

  // MENDAPATKAN DATA USER BUAT DROPDOWN PROFIL
  useEffect(() => {
    const account = async () => {
      if (isLoggedIn) {
        dispatch(getUser(navigate));
        dispatch(getNotification());
      }
    };
    account();
  }, []);

  // NAMPILIN MODAL LOGOUT
  const handleConfirmModalToggle = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  // UNTUK MEMBUKA DROPDOWN NOTIFIKASI
  const handleOpenNotification = () => {
    setShowDropdownNotification(!showDropdownNotification);
    setShowDropdownProfile(false);
  };

  // UNTUK MEMBUKA DROPDOWN PROFIL
  const handleOpenProfile = () => {
    setShowDropdownProfile(!showDropdownProfile);
    setShowDropdownNotification(false);
  };

  // BUAT GANTI WARNA BACKGROUND NAVBAR KALAU DI SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 transition-colors duration-500 ${
        isScrolled ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <a href="/" className="flex items-center space-x-3 text-white">
          <img
            src={Logobiflight}
            className="w-20 p-1.5 ml-12"
            alt="BiFlight Logo"
          />
        </a>
        <div className="flex flex-row items-center gap-5">
          {/* KALAU LOGIN */}
          {isLoggedIn ? (
            <>
              <Link to="/riwayat-pemesanan">
                <HiOutlineTicket
                  className={`text-3xl ${
                    isScrolled
                      ? "text-black hover:text-[#2A629A]"
                      : "text-white hover:text-[#86B6F6]"
                  }`}
                />
              </Link>
              <div
                onClick={handleOpenNotification}
                className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
              >
                <IoNotificationsOutline
                  className={`text-2xl ${
                    isScrolled
                      ? "text-black hover:text-[#2A629A]"
                      : "text-white hover:text-[#86B6F6]"
                  }`}
                />
                {notifikasi?.filter(
                  (notification) => notification.status === "unread"
                ).length === 0 ? (
                  ""
                ) : (
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -end-2">
                    {
                      notifikasi?.filter(
                        (notification) => notification.status === "unread"
                      ).length
                    }
                  </div>
                )}
              </div>
              {showDropdownNotification && (
                <div className="z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow absolute lg:right-10 md:right-12 top-16">
                  <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 ">
                    Notifikasi
                  </div>
                  {notifikasi?.filter((notif) => notif.status === "unread")
                    .length === 0 ? (
                    <div className="p-2">
                      <p className="text-center text-[#003285]">
                        Anda belum memiliki notifikasi terbaru
                      </p>
                    </div>
                  ) : (
                    <div>
                      {notifikasi
                        ?.filter((notif) => notif.status === "unread")
                        .slice(0, 3)
                        .map((notif) => (
                          <div
                            className="divide-y divide-gray-100 "
                            key={notif?.notification_id}
                          >
                            <div className="flex px-4 py-3 hover:bg-[#EEF5FF] ">
                              <div className="flex">
                                <IoMdNotifications className="text-white bg-[#40A2E3] rounded-full text-2xl p-1" />
                              </div>
                              <div className="w-full ps-3">
                                <div className="text-gray-500 text-xs">
                                  {notif?.title}
                                </div>
                                <div className="text-xs text-[#40A2E3] mb-1.5">
                                  {notif?.created_at}
                                </div>
                                <div className="text-sm mb-1.5">
                                  {notif?.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  <Link to="/notifikasi">
                    <div className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-[#EEF5FF] hover:text-[#003285]">
                      <div className="inline-flex items-center ">
                        <PiEyes className="text-xl" />
                        Lihat Semua
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              <div onClick={handleOpenProfile} className="flex text-sm ">
                <IoPersonOutline
                  className={`text-2xl ${
                    isScrolled
                      ? "text-black hover:text-[#2A629A]"
                      : "text-white hover:text-[#86B6F6]"
                  }`}
                />
              </div>
              {showDropdownProfile && (
                <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-16 right-4">
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div className="truncate">{profile?.name}</div>
                    <div className="font-medium truncate">{profile?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a
                        href="/profil"
                        className=" py-2 px-4 text-sm text-gray-700 hover:bg-[#EEF5FF] flex items-center"
                      >
                        <TbUser className="text-xl" /> Profil
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      className="w-full py-2 px-4 text-sm text-gray-700 hover:bg-[#EEF5FF] flex items-center"
                      onClick={() => {
                        setShowDropdownProfile(!showDropdownProfile),
                          handleConfirmModalToggle();
                      }}
                    >
                      <IoMdLogOut className="rotate-180 text-xl" /> Keluar
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            // KALAU TIDAK LOGIN
            <>
              <Link to="/login">
                <button
                  type="button"
                  className="py-2 px-4 rounded-xl bg-[#2A629A] text-white transition-colors duration-300 hover:bg-[#003285]"
                >
                  <div className="flex items-center font-medium">
                    <FiLogIn className="mr-1 font-bold text-xl" />
                    <span className="text-md">Masuk</span>
                  </div>
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="py-2 px-4 rounded-xl bg-[#2A629A] text-white transition-colors duration-300 hover:bg-[#003285]"
                >
                  <div className="flex items-center font-medium">
                    <span className="text-md">Daftar</span>
                  </div>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* <!-- Popup Modal Logout --> */}
      <div
        className={`${confirmModalOpen ? "" : "hidden"} 
    fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] max-h-full animate__animated animate__zoomIn mx-4 p-4">
          <div
            className={`relative p-4 w-full max-w-lg max-h-full transform transition-transform duration-300 ease-in-out ${
              confirmModalOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={handleConfirmModalToggle}
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
                <h3 className="mb-7 text-lg font-normal text-gray-500">
                  Apakah Anda yakin ingin keluar?
                </h3>
                <button
                  onClick={handleConfirmModalToggle}
                  type="button"
                  className="py-2 px-4 md:px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#003285] focus:z-10"
                >
                  Tidak
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    dispatch(logout(navigate));
                    handleConfirmModalToggle();
                  }}
                  className="text-white ms-3 bg-red-600 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-8 py-2 text-center"
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
