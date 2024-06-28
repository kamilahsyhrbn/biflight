import React, { useState } from "react";
import { TbUser, TbEdit } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/auth/loginActions";

export default function sideMenu() {
  const { profile, isLoading } = useSelector((state) => state.user);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // NAMPILIN MODAL LOGOUT
  const handleConfirmModalToggle = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  return (
    <div>
      <div>
        <div className="bg-white rounded-t-lg shadow p-4">
          {isLoading ? (
            <div className="max-w-sm animate-pulse w-full">
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
            </div>
          ) : (
            <div className="text-center text-[#003285]">
              <h2 className="font-medium text-2xl">{profile?.name}</h2>
            </div>
          )}
        </div>
        <div className=" bg-white shadow my-1.5">
          <div className="divide-y divide-gray-300">
            <Link to="/profil">
              <div
                className={`flex items-center px-4 py-3 
                 ${
                   location.pathname === "/profil" ||
                   location.pathname === "/ubah-akun"
                     ? `bg-[#2A629A] text-white`
                     : `text-[#003285] hover:bg-[#EEF5FF]`
                 }
              `}
              >
                <TbUser
                  className={`mr-2 text-2xl ${
                    location.pathname === "/profil" ||
                    location.pathname === "/ubah-akun"
                      ? ``
                      : `text-[#003285]`
                  } `}
                />
                Akun Saya
              </div>
            </Link>
            <Link to="/pengaturan-akun">
              <div
                className={`flex items-center px-4 py-3 
                 ${
                   location.pathname === "/pengaturan-akun"
                     ? `bg-[#2A629A] text-white`
                     : `text-[#003285] hover:bg-[#EEF5FF]`
                 }
              `}
              >
                <TbEdit
                  className={`mr-2 text-2xl ${
                    location.pathname === "/pengaturan-akun"
                      ? ``
                      : `text-[#003285]`
                  } `}
                />{" "}
                {profile?.isPasswordExist
                  ? "    Ubah Kata Sandi"
                  : "Buat Kata Sandi"}
              </div>
            </Link>
          </div>
        </div>
        <div className=" bg-white rounded-b-lg shadow mb-2">
          <div
            className="flex items-center hover:bg-[#EEF5FF] p-4 w-full rounded-b-lg text-[#003285]"
            onClick={handleConfirmModalToggle}
          >
            <IoMdLogOut className="mr-2 text-2xl" /> Keluar
          </div>
        </div>
      </div>
      {/* MODAL LOGOUT */}
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
    </div>
  );
}
