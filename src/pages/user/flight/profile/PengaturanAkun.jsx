import React, { useState, useEffect } from "react";
import Navbar from "../../../../assets/components/navigations/navbar/Navbar";
import NavbarMobile from "../../../../assets/components/navigations/navbar/Navbar-mobile";
import Footer from "../../../../assets/components/navigations/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import { BiSolidCheckCircle, BiErrorCircle } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../../../../assets/components/sideMenu";
import {
  addPassword,
  updatePassword,
} from "../../../../redux/actions/user/userActions";

export default function PengaturanAkun() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { profile } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSaveModal = () => {
    setSaveModalOpen(!saveModalOpen);
  };

  const handleSubmitModal = () => {
    setSubmitModalOpen(!submitModalOpen);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    if (profile?.isPasswordExist) {
      setNewPassword(value);
    } else {
      setPassword1(value);
    }

    // Menambahkan logika untuk menentukan kekuatan password
    if (value.length < 8) {
      setPasswordStrength("weak");
    } else if (value.length >= 8 && value.length < 12) {
      setPasswordStrength("medium");
    } else if (passwordRegex.test(value)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("medium");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword && !newPassword && !confirmPassword) {
      toast.error("Mohon isi semua kolom terlebih dahulu!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSaveModalOpen(!saveModalOpen);
      return;
    }

    if (!oldPassword) {
      toast.error("Mohon masukkan kata sandi lama Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSaveModalOpen(!saveModalOpen);
      return;
    }

    if (!newPassword) {
      toast.error("Mohon masukkan kata sandi baru Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSaveModalOpen(!saveModalOpen);
      return;
    }

    if (!confirmPassword) {
      toast.error("Mohon masukkan konfirmasi kata sandi Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSaveModalOpen(!saveModalOpen);
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Kata sandi harus berisi minimal 8 karakter, termasuk huruf besar dan angka.",
        {
          icon: null,
          style: {
            background: "#FF0000", // Background merah
            color: "#FFFFFF", // Teks putih
            borderRadius: "12px", // Rounded-xl
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
          },
          position: "top-center", // Posisi toast
          duration: 3000, // Durasi toast
        }
      );
      setSaveModalOpen(!saveModalOpen);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Kata sandi yang Anda masukkan tidak cocok!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSaveModalOpen(!saveModalOpen);
      return;
    }
    const update = await dispatch(updatePassword(oldPassword, newPassword));

    if (update === true) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setSaveModalOpen(!saveModalOpen);
  };

  const handleAddPassword = async (e) => {
    e.preventDefault();

    if (!password1 && password2) {
      toast.error("Mohon isi semua kolom terlebih dahulu!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSubmitModalOpen(!submitModalOpen);
      return;
    }

    if (!password1) {
      toast.error("Mohon masukkan kata sandi baru Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSubmitModalOpen(!submitModalOpen);
      return;
    }

    if (!password2) {
      toast.error("Mohon masukkan konfirmasi kata sandi baru Anda!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSubmitModalOpen(!submitModalOpen);
      return;
    }

    if (!passwordRegex.test(password1)) {
      toast.error(
        "Kata sandi harus berisi minimal 8 karakter, termasuk huruf besar dan angka.",
        {
          icon: null,
          style: {
            background: "#FF0000", // Background merah
            color: "#FFFFFF", // Teks putih
            borderRadius: "12px", // Rounded-xl
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
          },
          position: "top-center", // Posisi toast
          duration: 3000, // Durasi toast
        }
      );
      setSubmitModalOpen(!submitModalOpen);
      return;
    }

    if (password1 !== password2) {
      toast.error("Kata sandi yang Anda masukkan tidak cocok!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      setSubmitModalOpen(!submitModalOpen);
      return;
    }

    const add = await dispatch(addPassword(password1, password2, navigate));

    if (add === true) {
      setPassword1("");
      setPassword2("");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    setSubmitModalOpen(!submitModalOpen);
  };

  const oldPasswordInputType = showOldPassword ? "text" : "password"; // Menentukan tipe input untuk password lama
  const newPasswordInputType = showNewPassword ? "text" : "password"; // Menentukan tipe input untuk password baru
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password"; // Menentukan tipe input untuk konfirmasi password
  const passwordsMatch = newPassword === confirmPassword;
  const newPasswordsMatch = password1 === password2;

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10 md:py-20">
        {isMobile ? (
          ""
        ) : (
          <div className="lg:w-1/12 mb-5">
            <Link to="/">
              <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
                <IoIosArrowBack className="text-3xl" />
                <h6 className="text-lg">Kembali</h6>
              </div>
            </Link>
          </div>
        )}

        {/* <Toaster /> */}

        <div className="flex flex-col lg:flex-row justify-start lg:mx-24 gap-12 ">
          {/* SIDE MENU */}
          <div className="lg:w-2/5">
            <SideMenu />
          </div>

          <div className="w-full">
            <div className="text-[#003285] mb-5">
              <h2
                className={`font-medium text-3xl ${
                  isMobile ? "text-center" : ""
                }`}
              >
                {profile?.isPasswordExist
                  ? "  Ubah Kata Sandi"
                  : "  Buat Kata Sandi"}
              </h2>
            </div>
            <div>
              {profile?.isPasswordExist ? (
                // FORM CHANGE PASSWORD
                <form onSubmit={handleChangePassword}>
                  <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-full">
                    <div className="flex flex-col">
                      {/* PASSWORD LAMA */}
                      <div>
                        <label
                          htmlFor="oldPassword"
                          className="block mb-2 text-sm font-medium text-[#003285] "
                        >
                          Masukkan Kata Sandi Lama
                        </label>
                        <div className="flex items-center p-2 rounded-xl border border-[#8A8A8A] focus-within:border-[#2A629A] focus-within:shadow-lg">
                          <input
                            className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                            type={oldPasswordInputType}
                            placeholder="••••••••••"
                            value={oldPassword}
                            onChange={(e) => {
                              setOldPassword(e.target.value);
                            }}
                            id="oldPassword"
                          />
                          {showOldPassword ? (
                            <FiEye
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            />
                          ) : (
                            <FiEyeOff
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            />
                          )}
                        </div>
                      </div>

                      {/* PASSWORD BARU  */}
                      <div className="my-4">
                        <label
                          htmlFor="newPassword"
                          className="block mb-2 text-sm font-medium text-[#003285] "
                        >
                          Masukkan Kata Sandi Baru
                        </label>
                        <div className="flex items-center p-2 rounded-xl border border-[#8A8A8A] focus-within:border-[#2A629A] focus-within:shadow-lg">
                          <input
                            className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                            type={newPasswordInputType}
                            placeholder="••••••••••"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            id="newPassword"
                          />
                          {showNewPassword ? (
                            <FiEye
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            />
                          ) : (
                            <FiEyeOff
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            />
                          )}
                        </div>
                        {newPassword && (
                          <div className="flex items-center mt-1">
                            <div className="flex-shrink-0 w-[20px] h-[20px] mr-1">
                              {passwordStrength === "weak" && (
                                <BiErrorCircle className="text-[#FF0000] w-[20px] h-[20px]" />
                              )}
                              {passwordStrength === "medium" && (
                                <BiErrorCircle className="text-yellow-500 w-[20px] h-[20px]" />
                              )}
                              {passwordStrength === "strong" && (
                                <BiSolidCheckCircle className="text-[#28A745] w-[20px] h-[20px]" />
                              )}
                            </div>
                            <p className="text-xs text-[#8A8A8A]">
                              {passwordStrength === "weak"
                                ? "Password lemah"
                                : passwordStrength === "medium"
                                ? "Password sedang"
                                : "Password kuat"}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* KONFIRMASI PASSWORD BARU */}
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block mb-2 text-sm font-medium text-[#003285] "
                        >
                          Konfirmasi Kata Sandi Baru
                        </label>
                        <div className="flex items-center p-2 rounded-xl border border-[#8A8A8A] focus-within:border-[#2A629A] focus-within:shadow-lg">
                          <input
                            className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                            type={confirmPasswordInputType}
                            placeholder="••••••••••"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                            id="confirmPassword"
                          />
                          {showConfirmPassword ? (
                            <FiEye
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          ) : (
                            <FiEyeOff
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          )}
                        </div>
                        {!passwordsMatch && confirmPassword && (
                          <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                            <RxCrossCircled className="w-[20px] h-[20px] mr-1" />
                            <p>
                              Konfirmasi kata sandi tidak cocok dengan kata
                              sandi baru!
                            </p>
                          </div>
                        )}
                        {passwordsMatch && confirmPassword && (
                          <div className="flex items-center text-xs mt-1 text-left">
                            <BiSolidCheckCircle className="text-[#28A745] w-[20px] h-[20px] mr-1" />
                            <p className="text-[#8A8A8A]">
                              Konfirmasi kata sandi sudah cocok dengan kata
                              sandi baru
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-3">
                      <button
                        type="button"
                        onClick={handleSaveModal}
                        className="py-2 px-4 rounded-lg bg-[#2A629A] text-white hover:bg-[#003285]"
                      >
                        <div className="flex items-center font-medium">
                          Simpan Perubahan
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* MODAL SIMPAN PERUBAHN */}
                  {saveModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="relative w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] max-h-full animate__animated animate__zoomIn mx-4">
                        <div className="relative bg-white rounded-lg shadow">
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                              Simpan Perubahan Kata Sandi
                            </h3>
                            <button
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                              onClick={handleSaveModal}
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
                            <p className="text-base leading-relaxed text-gray-500">
                              Apakah Anda yakin ingin menyimpan perubahan kata
                              sandi?
                            </p>
                          </div>

                          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button
                              onClick={handleSaveModal}
                              className="py-2 px-4 md:px-7 me-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:text-[#2A629A]"
                            >
                              Batal
                            </button>
                            <button
                              className="text-white bg-[#2A629A] hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2 text-center"
                              type="submit"
                            >
                              Simpan
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                // FORM ADD PASSWORD
                <form onSubmit={handleAddPassword}>
                  <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-full">
                    <div className="flex flex-col">
                      {/* PASSWORD BARU  */}
                      <div className="mb-4">
                        <label
                          htmlFor="newPassword"
                          className="block mb-2 text-sm font-medium text-[#003285] "
                        >
                          Masukkan Kata Sandi Baru
                        </label>
                        <div className="flex items-center p-2 rounded-xl border border-[#D0D0D0] focus-within:border-[#2A629A] focus-within:shadow-lg">
                          <input
                            className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                            type={newPasswordInputType}
                            placeholder="••••••••••"
                            value={password1}
                            onChange={handlePasswordChange}
                            id="password1"
                          />
                          {showNewPassword ? (
                            <FiEye
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            />
                          ) : (
                            <FiEyeOff
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            />
                          )}
                        </div>
                        {password1 && (
                          <div className="flex items-center mt-1">
                            <div className="flex-shrink-0 w-[20px] h-[20px] mr-1">
                              {passwordStrength === "weak" && (
                                <BiErrorCircle className="text-[#FF0000] w-[20px] h-[20px]" />
                              )}
                              {passwordStrength === "medium" && (
                                <BiErrorCircle className="text-yellow-500 w-[20px] h-[20px]" />
                              )}
                              {passwordStrength === "strong" && (
                                <BiSolidCheckCircle className="text-[#28A745] w-[20px] h-[20px]" />
                              )}
                            </div>
                            <p className="text-xs">
                              {passwordStrength === "weak"
                                ? "Password lemah"
                                : passwordStrength === "medium"
                                ? "Password sedang"
                                : "Password kuat"}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* KONFIRMASI PASSWORD BARU */}
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block mb-2 text-sm font-medium text-[#003285] "
                        >
                          Konfirmasi Kata Sandi Baru
                        </label>
                        <div className="flex items-center p-2 rounded-xl border border-[#D0D0D0] focus-within:border-[#2A629A] focus-within:shadow-lg">
                          <input
                            className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                            type={confirmPasswordInputType}
                            placeholder="••••••••••"
                            value={password2}
                            onChange={(e) => {
                              setPassword2(e.target.value);
                            }}
                            id="password2"
                          />
                          {showConfirmPassword ? (
                            <FiEye
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          ) : (
                            <FiEyeOff
                              className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          )}
                        </div>
                        {!newPasswordsMatch && password2 && (
                          <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                            <RxCrossCircled className="w-[20px] h-[20px] mr-1" />
                            <p>
                              Konfirmasi kata sandi tidak cocok dengan kata
                              sandi baru!
                            </p>
                          </div>
                        )}
                        {newPasswordsMatch && password2 && (
                          <div className="flex items-center text-xs mt-1 text-left">
                            <BiSolidCheckCircle className="text-[#28A745] w-[20px] h-[20px] mr-1" />
                            <p>
                              Konfirmasi kata sandi sudah cocok dengan kata
                              sandi baru
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <button
                        type="button"
                        onClick={handleSubmitModal}
                        className="py-2 px-4 rounded-lg bg-[#2A629A] text-white hover:bg-[#003285]"
                      >
                        <div className="flex items-center font-medium">
                          Simpan Kata Sandi Baru
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* MODAL SIMPAN KATA SANDI BARU */}
                  {submitModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="relative w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] max-h-full animate__animated animate__zoomIn mx-4">
                        <div className="relative bg-white rounded-lg shadow">
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                              Simpan Kata Sandi
                            </h3>
                            <button
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                              onClick={handleSubmitModal}
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
                            <p className="text-base leading-relaxed text-gray-500">
                              Apakah Anda sudah yakin dengan kata sandi Anda?
                            </p>
                          </div>

                          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button
                              onClick={handleSubmitModal}
                              className="py-2 px-4 md:px-7 me-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:text-[#2A629A]"
                            >
                              Tidak
                            </button>
                            <button
                              className="text-white bg-[#2A629A] hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2 text-center"
                              type="submit"
                            >
                              Ya
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
