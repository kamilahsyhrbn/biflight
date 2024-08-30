import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { BiArrowBack, BiSolidCheckCircle, BiErrorCircle } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
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
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import Logobiflight from "../../../assets/images/logobiflight.png";
import Plane from "../../../assets/images/pesawat.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const {
    email,
    isEmailValid,
    password,
    showPassword,
    isPasswordTouched,
    loading,
    error,
  } = useSelector((state) => state.login); // Menggunakan useSelector untuk mengambil data dari state login
  const passwordInputType = showPassword ? "text" : "password";

  // Mengatur ulang state login ke nilai awal atau kosong
  useEffect(() => {
    // return () => {
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(setShowPassword(false));
    dispatch(setPasswordTouched(false));
    dispatch(clearError());
    // };
  }, []);

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
    }
  }, [error]);

  // Fungsi untuk menangani proses masuk akun
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Mohon masukkan alamat Email Anda!", {
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
    if (!email || !password) {
      toast.error(
        "Mohon masukkan alamat Email dan kata sandi terlebih dahulu!",
        {
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

    // Jika Email pengguna tidak diisi
    if (!isEmailValid) {
      toast.error("Mohon masukkan alamat Email dengan benar!", {
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

    dispatch(login(email, password, navigate));
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-[#FFF8ED] overflow-hidden">
        {/* {!isTablet && (
          <div className="hidden sm:block flex-grow-0 w-full h-full relative">
            <img
              src={Plane}
              className="object-cover w-full h-full"
              alt="Plane Image"
            />
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
        )} */}
        {/* Photo on Login Section */}
        <div className="hidden lg:block relative w-0 flex-1 bg-main">
          <img
            className="h-full w-full object-cover"
            src={Plane}
            style={{ height: "60vw", width: "100vw" }}
            alt="Plane Image"
          />
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
        <div
          className={`max-w-[400px] w-full rounded-lg px-5 sm:m-8 bg-[#FFF8ED] text-center h-auto relative
              ${isTablet ? "max-w-[650px] p-8" : ""}
            `}
        >
          <BiArrowBack
            className="absolute top-4 left-4 cursor-pointer text-[#2A629A] hover:text-[#40A2E3]"
            size={20}
            onClick={() => navigate("/")}
          />
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
                untuk akses cepat dan mudah <br /> ke tiket pesawat terbaik!
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
                                  ? "focus-within:border-[#2A629A]"
                                  : "focus-within:border-[#FF0000]"
                              } 
                              ${
                                isPasswordTouched
                                  ? "border-[#8A8A8A] focus-within:border-[#2A629A]"
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
                  {isPasswordTouched && !password && (
                    <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                      <BiErrorCircle className="w-[20px] h-[20px] mr-1.5 flex-shrink-0" />
                      <p>Kata sandi tidak boleh kosong</p>
                    </div>
                  )}
                </div>

                {/* Tombol masuk ke akun pengguna */}
                {/* <button
                  type="submit"
                  className="bg-[#2A629A] text-white text-sm font-medium p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                >
                  Masuk
                </button> */}

                {/* Loader dan Tombol Masuk Akun */}
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
                      "Masuk"
                    )}
                  </button>
                </div>
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

      {/* Scroll Up Button */}
      <BtnScrollTop />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
