import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack, BiSolidCheckCircle, BiErrorCircle } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../../../redux/actions/auth/loginActions";
import {
  setEmail,
  setPassword,
  setShowPassword,
  setPasswordTouched,
  clearError,
} from "../../../redux/reducers/auth/loginReducers";
import LoginGoogle from "./LoginGoogle";
import Footer from "../../../assets/components/navigations/Footer";
import backgroundImage from "../../../assets/images/loginregister.png";
import Logobiflight from "../../../assets/images/logobiflight.png";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const {
    email,
    isEmailValid,
    password,
    showPassword,
    isPasswordTouched,
    error,
  } = useSelector((state) => state.login); // Menggunakan useSelector untuk mengambil data dari state login
  const passwordInputType = showPassword ? "text" : "password";
  // Validasi password (minimal 8 karakter, termasuk huruf besar dan angka)
  const isPasswordValid =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  // Mengatur ulang state login ke nilai awal atau kosong
  useEffect(() => {
    return () => {
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setShowPassword(false));
      dispatch(setPasswordTouched(false));
      dispatch(clearError());
    };
  }, [dispatch]);

  // Fungsi untuk menangani perubahan input email
  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value));
  };

  // Fungsi untuk menangani perubahan input password
  const handlePasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setPassword(event.target.value));
    if (!isPasswordTouched) {
      dispatch(setPasswordTouched(true));
    }
  };

  // Fungsi untuk menangani toggle visibilitas password
  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword));
  };

  // Fungsi untuk menangani fokus input password
  const handlePasswordFocus = () => {
    if (!isPasswordTouched) {
      dispatch(setPasswordTouched(true));
    }
  };

  // Fungsi untuk menangani blur input password
  const handlePasswordBlur = () => {
    if (password === "") {
      dispatch(setPasswordTouched(false));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        // Menampilkan toast error
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
    }
  }, [error]);

  // Fungsi untuk menangani proses masuk akun
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Mohon masukkan alamat Email Anda!", {
        // Menampilkan toast error
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

    // Jika kata sandi pengguna tidak diisi
    if (!password) {
      toast.error("Mohon masukkan kata sandi Anda!", {
        // Menampilkan toast error
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

    // Jika semua kolom tidak diisi
    if (!email || !password) {
      toast.error("Mohon isi semua kolom terlebih dahulu!", {
        // Menampilkan toast error
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

    // Jika email dan kata sandi pengguna tidak sesuai ketentuan
    if (!isEmailValid && !isPasswordValid) {
      toast.error("Mohon isi kedua kolom sesuai ketentuan!", {
        // Menampilkan toast error
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

    // Jika Email pengguna tidak diisi
    if (!isEmailValid) {
      toast.error("Mohon masukkan alamat Email dengan benar!", {
        // Menampilkan toast error
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

    // Jika kata sandi pengguna tidak valid
    if (!isPasswordValid) {
      toast.error("Mohon masukkan kata sandi sesuai ketentuan!", {
        // Menampilkan toast error
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
    dispatch(login(email, password, navigate));
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div className="flex justify-center items-center min-h-screen w-full">
          <div
            className={`max-w-[400px] w-full rounded-lg p-5 sm:m-8 bg-[#FFF8ED] text-center relative shadow-lg
              ${isTablet ? "max-w-[650px] p-8" : ""}
            `}
          >
            <BiArrowBack
              className="absolute top-4 left-4 cursor-pointer text-[#2A629A]"
              size={20}
              onClick={() => navigate("/")}
            />
            <Toaster />
            <div className="max-w-[550px] w-full mx-auto flex flex-col items-center mt-5">
              <img
                src={Logobiflight}
                className="w-24 p-1.5"
                alt="BiFlight Logo"
              />
              <h1 className="text-[#003285] text-2xl font-bold text-center w-full mt-3 mb-3">
                Masuk ke Akun Anda
              </h1>
              <h2 className="text-[#40A2E3] text-sm font-medium mb-10 text-center w-full">
                <span className="text-[#40A2E3]">Masuk</span>
                <span className="text-[#2A629A]"> </span>
                <span className="text-[#8A8A8A]">
                  untuk akses cepat dan mudah ke tiket pesawat terbaik!
                </span>
              </h2>

              {/* Form masuk akun Email */}
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col space-y-3">
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
                        <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#28A745] flex-shrink-0" />
                      )}
                      {!isEmailValid && email && (
                        <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] ml-2 flex-shrink-0" />
                      )}
                    </div>
                    {!isEmailValid && email && (
                      <p className="text-[#FF0000] text-xs mt-1 text-left">
                        Format Email salah
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-left text-[#2A629A] text-sm font-medium">
                        Kata Sandi
                      </label>
                      <a
                        href="forgot-password"
                        className="text-[#40A2E3] text-sm hover:underline font-medium"
                      >
                        Lupa Kata Sandi
                      </a>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg
                              ${
                                password
                                  ? isPasswordValid
                                    ? "focus-within:border-[#2A629A]"
                                    : "focus-within:border-[#FF0000]"
                                  : "focus-within:border-[#2A629A]"
                              } 
                              ${
                                isPasswordTouched && !isPasswordValid
                                  ? "border-[#FF0000]"
                                  : "border-[#8A8A8A]"
                              }`}
                    >
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                        type={passwordInputType}
                        placeholder="••••••••••"
                        value={password}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        onChange={handlePasswordChange}
                      />
                      {showPassword ? (
                        <FiEye
                          className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer flex-shrink-0"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FiEyeOff
                          className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer flex-shrink-0"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                    {isPasswordTouched && !isPasswordValid && (
                      <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                        <BiErrorCircle className="w-[20px] h-[20px] mr-1.5 flex-shrink-0" />
                        <p>
                          Kata sandi berisi minimal 8 karakter, termasuk huruf
                          besar dan angka
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tombol masuk ke akun pengguna */}
                  <button
                    type="submit"
                    className="bg-[#2A629A] text-white text-sm font-medium p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                  >
                    Masuk
                  </button>
                </div>
              </form>

              <div className="relative max-w-[400px] w-full rounded-lg m-4 sm:m-8 mt-8 mb-8">
                <hr className="absolute left-0 right-0 border-t border-[#8A8A8A]" />
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFF8ED] px-2 text-[#2A629A] text-sm font-medium">
                  atau
                </p>
              </div>

              {/* Tombol masuk menggunakan akun Google kepada pengguna */}
              <LoginGoogle buttonText={"Lanjutkan dengan Google"} />

              {/* Mengarahkan ke halaman daftar jika pengguna belum punya akun */}
              <p className="text-[#8A8A8A] mt-7 text-sm font-medium">
                Baru di{" "}
                <a href="/" className="text-[#2A629A] mt-7 text-sm font-bold">
                  BiFlight
                </a>
                <span className="text-[#8A8A8A] mt-7 text-sm font-medium">
                  ?{" "}
                </span>
                <a
                  href="/register"
                  className="text-[#40A2E3] font-semibold text-sm hover:underline"
                >
                  Daftar di sini
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
