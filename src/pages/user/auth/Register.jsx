import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { BiArrowBack, BiSolidCheckCircle, BiErrorCircle } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { register } from "../../../redux/actions/auth/registerActions";
import {
  setName,
  setNameTouched,
  setNameValid,
  setEmail,
  setPassword,
  setShowPassword,
  setPasswordStrength,
  setConfirmPassword,
  setShowConfirmPassword,
  setPhoneNumber,
  clearError,
} from "../../../redux/reducers/auth/registerReducers";
import Footer from "../../../assets/components/navigations/Footer";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import Logobiflight from "../../../assets/images/logobiflight.png";
import Plane from "../../../assets/images/pesawat.png";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const {
    name,
    isNameTouched,
    isNameValid,
    email,
    isEmailValid,
    password,
    showPassword,
    passwordStrength,
    confirmPassword,
    showConfirmPassword,
    phone_number,
    isPhoneNumberValid,
    loading,
  } = useSelector((state) => state.register); // Menggunakan useSelector untuk mengambil data dari state register
  const passwordInputType = showPassword ? "text" : "password"; // Menentukan tipe input untuk kata sandi
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password"; // Menentukan tipe input untuk konfirmasi kata sandi
  const passwordsMatch = password === confirmPassword;

  // Mengatur ulang state registrasi ke nilai awal atau kosong
  useEffect(() => {
    // return () => {
    dispatch(setName(""));
    dispatch(setNameTouched(false));
    dispatch(setNameValid(false));
    dispatch(setEmail(""));
    dispatch(setPhoneNumber(""));
    dispatch(setPassword(""));
    dispatch(setShowPassword(false));
    dispatch(setConfirmPassword(""));
    dispatch(setShowConfirmPassword(false));
    dispatch(clearError());
    // };
  }, []);

  // Fungsi untuk menangani perubahan input nama
  const handleNameChange = (event) => {
    dispatch(clearError());
    const inputValue = event.target.value;
    // Memeriksa apakah nilai yang dimasukkan hanya huruf
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      dispatch(setName(inputValue));
    }
    if (!isNameTouched) {
      dispatch(setNameTouched(true));
    }
  };

  // Fungsi untuk menangani fokus input nama
  const handleNameFocus = () => {
    if (!isNameTouched) {
      dispatch(setNameTouched(true));
    }
  };

  // Fungsi untuk menangani blur input nama
  const handleNameBlur = () => {
    if (name === "") {
      dispatch(setNameTouched(false));
    }
  };

  // Fungsi untuk menangani perubahan input email
  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value));
  };

  // Fungsi untuk menangani perubahan input nomor telepon
  const handlePhoneNumberChange = (event) => {
    dispatch(clearError());
    const { value } = event.target;
    const isValidPhoneNumber = /^\d*$/.test(value); // Mengizinkan angka atau kosong
    if (isValidPhoneNumber) {
      dispatch(setPhoneNumber(value));
    }
  };

  // Fungsi untuk menangani perubahan input password
  const handlePasswordChange = (event) => {
    dispatch(clearError());
    const { value } = event.target;
    dispatch(setPassword(value));
    // Menambahkan logika untuk menentukan kekuatan password
    if (value.length < 8) {
      dispatch(setPasswordStrength("weak"));
    } else if (value.length >= 8 && value.length < 12) {
      dispatch(setPasswordStrength("medium"));
    } else {
      dispatch(setPasswordStrength("strong"));
    }
  };

  // Fungsi untuk menangani toggle visibilitas password
  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword));
  };

  // Fungsi untuk menangani perubahan input konfirmasi password
  const handleConfirmPasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setConfirmPassword(event.target.value)); // Update confirmPassword
  };

  // Fungsi untuk menangani toggle visibilitas konfirmasi password
  const toggleConfirmPasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowConfirmPassword(!showConfirmPassword));
  };

  // Fungsi untuk menangani proses registrasi akun
  const handleRegister = async (event) => {
    event.preventDefault();
    // Jika nama pengguna tidak diisi
    if (!name) {
      toast.error("Mohon masukkan nama Anda!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika Email pengguna tidak diisi
    if (!email) {
      toast.error("Mohon masukkan alamat Email Anda!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika nomor ponsel pengguna tidak diisi
    if (!phone_number) {
      toast.error("Mohon masukkan nomor ponsel Anda!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika kata sandi pengguna tidak diisi
    if (!password) {
      toast.error("Mohon masukkan kata sandi Anda!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika konfirmasi kata sandi pengguna tidak diisi
    if (!confirmPassword) {
      toast.error("Mohon masukkan konfirmasi kata sandi Anda!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika semua kolom tidak diisi
    if (!name || !email || !phone_number || !password || !confirmPassword) {
      toast.error("Mohon isi semua kolom terlebih dahulu!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika nama kurang dari minimum karakter
    if (name.length < 3) {
      toast.error("Mohon masukkan nama dengan benar!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika Email pengguna tidak valid
    if (!isEmailValid) {
      toast.error("Mohon masukkan alamat Email dengan benar!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika nomor nomor ponsel pengguna kurang atau lebih dari dari batas karakter
    if (phone_number.length < 8 || phone_number.length > 14) {
      toast.error("Mohon masukkan nomor ponsel dengan benar!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    // Jika kata sandi pengguna tidak sesuai ketentuan
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Kata sandi harus berisi minimal 8 karakter, termasuk huruf besar dan angka.",
        {
          // Menampilkan toast error
          icon: null,
          style: {
            background: "#FF0000",
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "14px",
            textAlign: "center",
            maxWidth: "900px",
          },
          position: "top-center",
          duration: 3000,
        }
      );
      return;
    }

    // Jika kata sandi tidak cocok dengan konfirmasi kata sandi
    if (password !== confirmPassword) {
      toast.error(
        "Kata sandi yang Anda masukkan tidak cocok dengan konfirmasi kata sandi!",
        {
          // Menampilkan toast error
          icon: null,
          style: {
            background: "#FF0000",
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "14px",
            textAlign: "center",
            maxWidth: "900px",
          },
          position: "top-center",
          duration: 3000,
        }
      );
      return;
    }

    dispatch(register(email, name, password, phone_number, navigate));
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-[#FFF8ED]">
        {/* {!isTablet && (
          <div className="hidden sm:flex flex-grow-0">
            <img
              src={Plane}
              className="object-cover w-full h-full"
              style={{ height: "64vw", width: "100vw" }}
              alt="Plane Image"
            />
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
        )} */}
        {/* Photo on Register Section */}
        <div className="hidden lg:block relative w-0 flex-1 bg-main">
          <img
            className="h-full w-full object-cover"
            src={Plane}
            style={{ height: "68vw", width: "100vw" }}
            alt="Plane Image"
          />
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
        <div
          className={`max-w-[400px] w-full rounded-lg px-5 sm:m-8 bg-[#FFF8ED] text-center relative
              ${isTablet ? "max-w-[650px] p-8" : ""}
            `}
        >
          <BiArrowBack
            className="absolute top-4 left-4 cursor-pointer text-[#2A629A] hover:text-[#40A2E3]"
            size={20}
            onClick={() => navigate("/login")}
          />

          <div className="max-w-[550px] w-full mx-auto flex flex-col items-center mt-5">
            <img
              src={Logobiflight}
              className="w-24 p-1.5"
              alt="BiFlight Logo"
            />
            <h1 className="text-[#003285] text-2xl mb-3 mt-3 font-bold text-center w-full">
              Buat Akun Baru Anda
            </h1>
            <h2 className="text-[#40A2E3] text-sm font-medium mb-10 text-center w-full">
              <span className="text-[#40A2E3]">Daftarkan</span>
              <span className="text-[#2A629A]"> </span>
              <span className="text-[#8A8A8A]">
                akun Anda dan dapatkan akses ke promo tiket pesawat murah!
              </span>
            </h2>

            {/* Forms Section */}
            <form onSubmit={handleRegister} className="w-full">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] text-sm font-medium">
                    Nama
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg
                    ${
                      name
                        ? isNameTouched
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-[#FF0000]"
                        : "focus-within:border-[#2A629A]"
                    } 
                    ${
                      !isNameTouched && name
                        ? "border-[#FF0000]"
                        : "border-[#8A8A8A]"
                    }
                    ${
                      name
                        ? !isNameValid && name && name.length < 3
                          ? "focus-within:border-[#FF0000] border-[#8A8A8A]"
                          : "focus-within:border-[#2A629A]"
                        : "focus-within:border-[#FF0000] border-[#8A8A8A]"
                    }`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                      type="text"
                      placeholder="Nama Lengkap"
                      value={name}
                      onFocus={handleNameFocus}
                      onBlur={handleNameBlur}
                      onChange={handleNameChange}
                    />
                  </div>
                  {isNameTouched && !name && (
                    <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                      <BiErrorCircle className="w-[20px] h-[20px] mr-1.5 flex-shrink-0" />
                      <p>Nama tidak boleh kosong</p>
                    </div>
                  )}
                  {!isNameValid && name && name.length < 3 && (
                    <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                      <BiErrorCircle className="w-[20px] h-[20px] mr-1.5 flex-shrink-0" />
                      <p>Nama terlalu pendek, minimum 3 huruf</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] text-sm font-medium">
                    Email
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg
                    ${
                      email
                        ? isEmailValid
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-[#FF0000]"
                        : "focus-within:border-[#2A629A]"
                    } 
                    ${
                      !isEmailValid && email
                        ? "border-[#FF0000]"
                        : "border-[#8A8A8A]"
                    }`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                      type="text"
                      placeholder="Alamat Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {isEmailValid && (
                      <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#28A745] flex-shrink-0 mr-1" />
                    )}
                    {!isEmailValid && email && (
                      <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] ml-2 flex-shrink-0 mr-1" />
                    )}
                  </div>
                  {!isEmailValid && email && (
                    <p className="text-[#FF0000] text-xs mt-1 text-left">
                      Format Email salah
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] text-sm font-medium">
                    Nomor Ponsel
                  </label>
                  <div
                    className={`flex items-center rounded-xl border focus-within:shadow-lg
                    ${
                      phone_number
                        ? isPhoneNumberValid
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-[#FF0000]"
                        : "focus-within:border-[#2A629A]"
                    } 
                    ${
                      !isPhoneNumberValid && phone_number
                        ? "border-[#FF0000]"
                        : "border-[#8A8A8A]"
                    }`}
                  >
                    <div className="flex items-center bg-gray-300 p-2 px-3 rounded-l-xl border-r-0">
                      <span className="text-sm text-[#2A629A] font-medium">
                        +62
                      </span>
                    </div>
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] pl-2 min-w-0"
                      type="text"
                      placeholder="8123456789"
                      value={phone_number}
                      onChange={handlePhoneNumberChange}
                    />
                    {isPhoneNumberValid && (
                      <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#28A745] mr-3 flex-shrink-0" />
                    )}
                    {!isPhoneNumberValid &&
                      phone_number &&
                      phone_number.length > 0 && (
                        <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] mr-2.5 flex-shrink-0" />
                      )}
                  </div>
                  {!isPhoneNumberValid &&
                    phone_number &&
                    phone_number.length < 8 && (
                      <p className="text-[#FF0000] text-xs mt-1 text-left">
                        Nomor ponsel terlalu pendek, minimum 8 angka
                      </p>
                    )}
                  {!isPhoneNumberValid &&
                    phone_number &&
                    phone_number.length > 14 && (
                      <p className="text-[#FF0000] text-xs mt-1 text-left">
                        Nomor ponsel terlalu panjang, maksimum 14 angka
                      </p>
                    )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] text-sm font-medium">
                    Kata Sandi
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl border ${
                      password &&
                      (passwordStrength === "weak" ||
                        passwordStrength === "medium")
                        ? "border-[#FF0000]"
                        : "border-[#8A8A8A]"
                    } border-[#2A629A] focus-within:shadow-lg`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                      type={passwordInputType}
                      placeholder="••••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {showPassword ? (
                      <FaEye
                        className="w-[17px] h-[17px] text-[#8A8A8A] hover:text-[#40A2E3] cursor-pointer flex-shrink-0 mr-1"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEyeSlash
                        className="w-[17px] h-[17px] text-[#8A8A8A] hover:text-[#40A2E3] cursor-pointer flex-shrink-0 mr-1"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  {password && (
                    <div className="flex items-center mt-1">
                      <div className="flex-shrink-0 w-[20px] h-[20px] mr-1.5">
                        {passwordStrength === "weak" && (
                          <BiErrorCircle className="text-[#FF0000] w-[20px] h-[20px] flex-shrink-0" />
                        )}
                        {passwordStrength === "medium" && (
                          <BiErrorCircle className="text-yellow-500 w-[20px] h-[20px] flex-shrink-0" />
                        )}
                        {passwordStrength === "strong" && (
                          <BiSolidCheckCircle className="text-[#28A745] w-[20px] h-[20px] flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#8A8A8A]">
                        {passwordStrength === "weak"
                          ? "Kata sandi lemah"
                          : passwordStrength === "medium"
                          ? "Kata sandi sedang"
                          : "Kata sandi kuat"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] text-sm font-medium">
                    Konfirmasi Kata Sandi
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl border ${
                      !passwordsMatch && confirmPassword
                        ? "border-[#FF0000]"
                        : "border-[#8A8A8A]"
                    } border-[#2A629A] focus-within:shadow-lg`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                      type={confirmPasswordInputType}
                      placeholder="••••••••••"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    {showConfirmPassword ? (
                      <FaEye
                        className="w-[17px] h-[17px] text-[#8A8A8A] hover:text-[#40A2E3] cursor-pointer flex-shrink-0 mr-1"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <FaEyeSlash
                        className="w-[17px] h-[17px] text-[#8A8A8A] hover:text-[#40A2E3] cursor-pointer flex-shrink-0 mr-1"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )}
                  </div>
                  {!passwordsMatch && confirmPassword && (
                    <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                      <RxCrossCircled className="w-[20px] h-[20px] mr-1.5 flex-shrink-0" />
                      <p>Konfirmasi kata sandi tidak cocok dengan kata sandi</p>
                    </div>
                  )}
                </div>

                {/* Loader dan Tombol Daftar Akun */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading
                        ? "bg-[#003285]"
                        : "bg-[#2A629A] hover:bg-[#003285]"
                    } text-white text-sm font-medium w-full py-2 rounded-xl focus:outline-none transition duration-300 flex items-center justify-center`}
                  >
                    {loading ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="w-20 h-5"
                      >
                        <circle cx="12" cy="2" r="0" fill="currentColor">
                          <animate
                            attributeName="r"
                            begin="0"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(45 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.125s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(90 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.25s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(135 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.375s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(180 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.5s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(225 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.625s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(270 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.75s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle
                          cx="12"
                          cy="2"
                          r="0"
                          fill="currentColor"
                          transform="rotate(315 12 12)"
                        >
                          <animate
                            attributeName="r"
                            begin="0.875s"
                            calcMode="spline"
                            dur="1s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                      </svg>
                    ) : (
                      "Daftar"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <p className="text-[#8A8A8A] mt-7 text-sm font-medium">
              Sudah punya akun{" "}
              <a href="/" className="text-[#2A629A] mt-7 text-sm font-bold">
                BiFlight
              </a>
              <span className="text-[#8A8A8A] mt-7 text-sm font-medium">
                ?{" "}
              </span>
              <a
                href="/login"
                className="text-[#40A2E3] hover:underline font-semibold text-sm"
              >
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Up Button */}
      <BtnScrollTop />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
