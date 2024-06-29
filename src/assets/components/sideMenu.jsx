import React, { useEffect, useState } from "react";
import { TbUser, TbEdit, TbUserMinus } from "react-icons/tb";
import { IoMdLogOut, IoMdRefresh } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/auth/loginActions";
import { deleteUser } from "../../redux/actions/user/userActions";
import toast from "react-hot-toast";
import captcha from "../images/captcha.png";

export default function sideMenu() {
  const { profile, isLoading } = useSelector((state) => state.user);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [captchaCode, setCaptchaCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // NAMPILIN MODAL LOGOUT
  const handleConfirmModalToggle = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  // NAMPILIN MODAL DELETE
  const handleConfirmDeleteToggle = () => {
    setConfirmDeleteOpen(!confirmDeleteOpen);
    setStep(1);
  };

  // UNTUK MELANJUTKAN KE MODAL CAPTCHA
  const handleYesClick = () => {
    setStep(2);
  };

  // MENG-GENERATE ULANG SETIAP MODAL HAPUS AKUN DI KLIK
  useEffect(() => {
    generateCaptchaCode();
  }, [confirmDeleteOpen]);

  // MEMBUAT KODE CAPTCHA
  const generateCaptchaCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(code);
    setIsValid(false);
  };

  // MEMVALIDASI KODE CAPTCHA
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
    if (e.target.value === captchaCode) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // MENGIRIM KODE CAPTCHA
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInput) {
      toast("Silakan masukkan kode captcha!", {
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

      return;
    }

    if (userInput.trim() === "") {
      toast("Silakan masukkan kode captcha!", {
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

      return;
    }

    if (!isValid) {
      toast("Kode captcha tidak sesuai!", {
        style: {
          background: "#FF0000",
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // UKuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
          maxWidth: "900px",
        },
      });

      return;
    }

    if (isValid) {
      dispatch(deleteUser(profile?.email, navigate));
    }
  };

  return (
    <div>
      <div>
        <div className="bg-white rounded-t-3xl shadow p-4">
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
            <div
              className="flex items-center px-4 py-3 text-[#FF0000] hover:bg-[#EEF5FF]"
              onClick={handleConfirmDeleteToggle}
            >
              <TbUserMinus className="mr-2 text-2xl text-[#FF0000]" /> Hapus
              Akun
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-b-3xl shadow mb-2">
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

      {/* MODAL KONFIRMASI HAPUS AKUN */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          confirmDeleteOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full max-w-xl transform transition-transform duration-300 ease-in-out ${
            confirmDeleteOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow overflow-x-hidden">
            <button
              onClick={handleConfirmDeleteToggle}
              type="button"
              className="absolute top-3 end-2.5 z-50 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
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

            <div
              className={`transition-transform duration-300 ease-in-out ${
                step === 1 ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {step === 1 && (
                <div className="p-4 md:p-5 flex justify-center flex-col items-center text-center">
                  <iframe src="https://lottie.host/embed/43cf72cb-f4cc-4491-a218-05d127d73ce1/RhKDgbsfaS.json"></iframe>
                  <h3 className="mb-5 text-lg font-normal text-gray-500">
                    Apakah Anda yakin ingin menghapus akun?
                  </h3>
                  <div>
                    <button
                      onClick={handleConfirmDeleteToggle}
                      type="button"
                      className="py-2.5 px-5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleYesClick}
                      type="button"
                      className="text-white ms-3 bg-[#FF0000] hover:bg-red-600 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Ya
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`transition-transform duration-300 ease-in-out ${
                step === 2 ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {step === 2 && (
                <div className="p-4 md:p-5 flex justify-center flex-col items-center text-center">
                  <h2 className="text-lg font-medium mb-4">
                    Masukkan Kode Captcha
                  </h2>
                  <div className="flex justify-center items-start mb-4">
                    <div
                      style={{
                        backgroundImage: `url(${captcha})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="py-3 px-4"
                    >
                      {captchaCode.split("").map((char, index) => (
                        <span
                          key={index}
                          className={`${
                            index % 2 === 0 ? "top-0" : "top-2"
                          } text-2xl font-bold relative `}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                    <button
                      className="ml-4 text-sm font-bold text-gray-600 hover:text-gray-900"
                      onClick={generateCaptchaCode}
                    >
                      <IoMdRefresh className="text-xl" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="w-full">
                    <div
                      className={`flex items-center p-2 rounded-xl border border-black focus-within:shadow-lg w-10/12 mx-auto
                    ${
                      userInput && isValid
                        ? "focus-within:border-[#2A629A] border-[#8A8A8A]"
                        : ""
                    }
                    ${
                      userInput && !isValid
                        ? "focus-within:border-[#FF0000] border-[#8A8A8A]"
                        : ""
                    }`}
                    >
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm"
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        placeholder="Masukkan Kode Captcha"
                      />
                    </div>
                    {userInput && !isValid && (
                      <p className="text-[#FF0000] mt-2">
                        Captcha tidak sesuai!
                      </p>
                    )}
                    {userInput && isValid && (
                      <p className="text-[#28A745] mt-2">
                        Captcha sudah sesuai!
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full p-2 bg-[#FF0000] hover:bg-red-600 text-white font-medium rounded-lg mt-2"
                    >
                      Hapus Akun
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
