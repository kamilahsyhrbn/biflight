import React, { useEffect, useState, Fragment } from "react";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Listbox, Transition } from "@headlessui/react";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import {
  UpdateNotifications,
  getNotification,
  readAllNotifications,
} from "../../../redux/actions/flight/notificationActions";

//ICON
import { IoFilter } from "react-icons/io5";
import {
  IoMdNotifications,
  IoMdCheckmark,
  IoIosArrowBack,
} from "react-icons/io";
import { HiOutlineSelector } from "react-icons/hi";

const filter = [
  { id: 1, status: "Semua" },
  { id: 2, status: "Belum dibaca" },
  { id: 3, status: "Dibaca" },
];

export default function Notification() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [selected, setSelected] = useState(filter[0]);

  const { notifikasi } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const handleUpdateStatus = (id) => {
    dispatch(UpdateNotifications(id)).then(() => {
      // Setelah pembaruan, ambil notifikasi terbaru
      dispatch(getNotification());
    });
  };

  const handleReadAll = () => {
    dispatch(readAllNotifications()).then(() => {
      // Setelah pembaruan, ambil notifikasi terbaru
      dispatch(getNotification());
    });
  };

  const filteredNotifications = notifikasi.filter((notification) => {
    if (selected?.status === "Semua") return true;
    if (selected?.status === "Dibaca" && notification?.status === "read")
      return true;
    if (
      selected?.status === "Belum dibaca" &&
      notification?.status === "unread"
    )
      return true;
    return false;
  });

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-3 justify-between md:gap-0">
          <div className={`${isMobile ? "hidden" : "lg:w-1/12"}`}>
            <Link to="/">
              <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
                <IoIosArrowBack className="text-3xl" />
                <h6 className="text-lg">Kembali</h6>
              </div>
            </Link>
          </div>

          <Toaster />
          <div className="text-center flex-1">
            <h5 className="text-3xl font-medium text-[#003285]">Notifikasi</h5>
          </div>
          {/* DROPDOWN SELECT FILTER */}
          <div className="flex items-center">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="mt-1 relative w-44">
                    <Listbox.Button className="flex items-center border-[#003285] border-2 py-2 px-3 w-full rounded-full">
                      <span className="truncate flex items-center">
                        <IoFilter className="mr-1 text-xl" />
                        {selected.status}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
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
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`
                                    ${
                                      selected ? "font-semibold" : "font-normal"
                                    }
                                    block whitespace-nowrap
                                  `}
                                >
                                  {filtered.status}
                                </span>

                                {selected ? (
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

            {/* BUTTON BACA SEMUA NOTIFIKASI */}
            <button
              type="button"
              className="py-2 px-6 ml-4 rounded-xl bg-[#2A629A] text-white hover:bg-[#3472b0]"
              onClick={handleReadAll}
            >
              <div className="flex items-center font-medium">
                <span className="text-md">Baca Semua</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center md:my-10 my-5">
          {/* JIKA BELUM ADA NOTIFIKASI */}
          {filteredNotifications?.length === 0 && (
            <div>
              <iframe
                src="https://lottie.host/embed/397bb08f-ee92-4a3f-af20-150e6772e5a8/t586J4UID0.json"
                className="md:ml-10 ml-7"
              ></iframe>
              <h5 className="text-[#003285] text-xl font-medium text-center">
                Halaman notifikasi Anda masih kosong
              </h5>
            </div>
          )}

          {/* JIKA SUDAH ADA NOTIFIKASI */}
          <div className="w-full flex flex-col">
            {/* NOTIFIKASI */}
            {filteredNotifications?.map((notif) => (
              <div key={notif?.notification_id}>
                <div
                  className="bg-white shadow-lg p-6 rounded-xl my-3"
                  onClick={() => handleUpdateStatus(notif?.notification_id)}
                >
                  <div
                    className={`flex justify-between  ${
                      isMobile ? "flex-col" : "items-center"
                    }`}
                  >
                    <div className="flex items-center">
                      <IoMdNotifications className="text-white bg-[#40A2E3] rounded-full text-3xl p-1" />
                      <p className="ml-2 font-medium text-[#003285]">
                        {notif?.title}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        isMobile ? "ms-10 text-sm" : ""
                      }`}
                    >
                      <time>{notif?.created_at}</time>

                      <button
                        className={`group flex items-center justify-start w-2.5 h-2.5 ${
                          notif?.status === "unread"
                            ? "bg-[#FF0000]"
                            : "bg-[#28A745]"
                        } rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:h-11 hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1`}
                      >
                        <div className="absolute pl-2 transform translate-x-full opacity-0 text-white font-medium transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          {notif?.status === "unread"
                            ? "Belum dibaca"
                            : "Sudah dibaca"}
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="ps-10">
                    <p>{notif?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
