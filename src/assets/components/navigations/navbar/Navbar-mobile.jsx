import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoNotificationsOutline,
  IoPersonOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../../../redux/actions/flight/notificationActions";
import toast from "react-hot-toast";
import { HiOutlineTicket } from "react-icons/hi2";

export default function NavbarMobile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.login); // VALIDASI NAVBAR
  const { notifikasi } = useSelector((state) => state.notification); // UNTUK JUMLAH NOTIFIKASI

  // MENDAPATKAN DATA NOTIFIKASI BUAT JUMLAH NOTIFIKASI
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getNotification());
    }
  }, [dispatch]);

  return (
    <>
      <div className="fixed bottom-0 z-50 w-full shadow-2xl">
        <div className="flex h-full items-center justify-between bg-white px-5 py-2">
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <div
              className={
                location.pathname === "/" ? `text-[#2A629A]` : `text-slate-500`
              }
            >
              <IoHomeOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Beranda
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2 mt-2.5"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/notifikasi");
              } else {
                navigate("/login");
                setTimeout(() => {
                  toast("Silakan masuk terlebih dahulu!", {
                    style: {
                      background: "#FF0000",
                      color: "#FFFFFF", // TEKS PUTIH
                      borderRadius: "12px",
                      fontSize: "14px", // Ukuran font
                      textAlign: "center", // TEKS TENGAH
                      padding: "10px 20px", // Padding
                      width: "full",
                      maxWidth: "900px",
                    },
                  });
                }, 100);
              }
            }}
          >
            <div
              className={
                location.pathname === "/notifikasi"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <IoNotificationsOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/notifikasi"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Notifikasi
            </span>
            {isLoggedIn ? (
              <div>
                {notifikasi?.filter(
                  (notification) => notification.status === "unread"
                ).length === 0 ? (
                  ""
                ) : (
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full top-3">
                    {
                      notifikasi?.filter(
                        (notification) => notification.status === "unread"
                      ).length
                    }
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/riwayat-pemesanan");
              } else {
                navigate("/login");
                setTimeout(() => {
                  toast("Silakan masuk terlebih dahulu!", {
                    style: {
                      background: "#FF0000",
                      color: "#FFFFFF", // TEKS PUTIH
                      borderRadius: "12px",
                      fontSize: "14px", // Ukuran font
                      textAlign: "center", // TEKS TENGAH
                      padding: "10px 20px", // Padding
                      width: "full",
                      maxWidth: "900px",
                    },
                  });
                }, 100);
              }
            }}
          >
            <div
              className={
                location.pathname === "/riwayat-pemesanan"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <HiOutlineTicket size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/riwayat-pemesanan"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Riwayat
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/profil");
              } else {
                navigate("/login");
                setTimeout(() => {
                  toast("Silakan masuk terlebih dahulu!", {
                    style: {
                      background: "#FF0000",
                      color: "#FFFFFF", // TEKS PUTIH
                      borderRadius: "12px",
                      fontSize: "14px", // Ukuran font
                      textAlign: "center", // TEKS TENGAH
                      padding: "10px 20px", // Padding
                      width: "full",
                      maxWidth: "900px",
                    },
                  });
                }, 100);
              }
            }}
          >
            <div
              className={
                location.pathname === "/profil" ||
                location.pathname === "/pengaturan-akun"
                  ? `text-[#2A629A]`
                  : `text-slate-500`
              }
            >
              <IoPersonOutline size={25} />
            </div>
            <span
              className={`text-sm
                ${
                  location.pathname === "/profil" ||
                  location.pathname === "/pengaturan-akun"
                    ? `font-semibold text-[#2A629A]`
                    : `text-slate-500`
                }`}
            >
              Akun
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
