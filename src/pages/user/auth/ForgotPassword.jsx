import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BiErrorCircle, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUpdatePass } from "../../../redux/actions/auth/getPassActions";
import { useMediaQuery } from "react-responsive";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import Footer from "../../../assets/components/navigations/Footer";
import Logobiflight from "../../../assets/images/logobiflight.png";
import Plane from "../../../assets/images/pesawat.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token")?.replace(/ /g, "+");

  //   const tokenParam = queryParams.get("token");

  // // Periksa apakah tokenParam ada sebelum melakukan operasi replace
  // const token = tokenParam ? tokenParam.replace(/ /g, "+") : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("password:", password);
    // console.log("Confirm password:", confirmPassword);
    if (password !== confirmPassword) {
      toast.error("Kata sandi yang Anda masukkan tidak cocok!", {
        icon: null,
        style: {
          background: "#FF0000 ",
          color: "#FFFFFF",
          borderRadius: "12px",
          fontSize: "14px",
          textAlign: "center",
          padding: "10px 20px",
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (!password) {
      toast.error("Mohon masukkan kata sandi baru Anda!", {
        icon: null,
        style: {
          background: "#FF0000 ",
          color: "#FFFFFF",
          borderRadius: "12px",
          fontSize: "14px",
          textAlign: "center",
          padding: "10px 20px",
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (!confirmPassword) {
      toast.error("Mohon ulangi kata sandi baru Anda!", {
        icon: null,
        style: {
          background: "#FF0000 ",
          color: "#FFFFFF",
          borderRadius: "12px",
          fontSize: "14px",
          textAlign: "center",
          padding: "10px 20px",
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (!isPasswordValid) {
      toast.error("Mohon masukkan kata sandi sesuai ketentuan!", {
        icon: null,
        style: {
          background: "#FF0000 ",
          color: "#FFFFFF",
          borderRadius: "12px",
          fontSize: "14px",
          textAlign: "center",
          padding: "10px 20px",
          width: "full",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    dispatch(getUpdatePass(password, confirmPassword, token, navigate));
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "newPassword") {
        setPassword(e.target.value);
      }
      if (e.target.id === "confirmPassword") {
        setConfirmPassword(e.target.value);
      }
      setIsPasswordTouched(true);
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const newPasswordInputType = showNewPassword ? "text" : "password";
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";

  const isPasswordValid =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-[#FFF8ED]">
        {!isTablet && (
          <div
            className="hidden sm:flex flex-grow-0 w-full h-screen"
            style={{
              backgroundImage: `url(${Plane})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
        <div
          className={`max-w-[400px] w-full rounded-lg px-5 sm:m-8 bg-[#FFF8ED] text-center h-auto relative
              ${isTablet ? "max-w-[650px] p-8" : ""}
            `}
        >
          <BiArrowBack
            className="absolute top-4 left-4 cursor-pointer text-[#2A629A]"
            size={20}
            onClick={() => navigate("/forgot-password")}
          />
          <Toaster />
          <div className="max-w-[550px] mx-auto flex flex-col items-center mt-5">
            <img
              src={Logobiflight}
              className="w-24 p-1.5"
              alt="BiFlight Logo"
            />
            <h1 className="text-[#003285] text-2xl font-bold text-center w-full mt-3 mb-3">
              Atur Ulang Kata Sandi
            </h1>
            <h2 className="text-[#40A2E3] text-sm font-medium mb-10 text-center w-full">
              <span className="text-[#40A2E3]">
                Atur ulang
                <span> </span>
              </span>
              <span className="text-[#8A8A8A]">
                kata sandi Anda untuk mengamankan akun.
              </span>
            </h2>

            {/* Form mengatur ulang kata sandi baru */}
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] font-medium text-sm min-w-0">
                    Buat Kata Sandi Baru
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg ${
                      password
                        ? isPasswordValid
                          ? "border-[#2A629A]"
                          : "border-red-500"
                        : "border-[#8A8A8A]"
                    }`}
                  >
                    <input
                      type={newPasswordInputType}
                      value={password}
                      onChange={handleInput}
                      id="newPassword"
                      placeholder="••••••••••"
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                    />
                    {showNewPassword ? (
                      <FiEye
                        className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer flex-shrink-0"
                        onClick={toggleNewPasswordVisibility}
                      />
                    ) : (
                      <FiEyeOff
                        className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer flex-shrink-0"
                        onClick={toggleNewPasswordVisibility}
                      />
                    )}
                  </div>
                  {isPasswordTouched && !isPasswordValid && (
                    <div className="flex items-center text-red-500 text-xs mt-1 text-left">
                      <BiErrorCircle className="w-[20px] h-[20px] mr-1.5 flex-shrink-0" />
                      <p>
                        Kata sandi berisi minimal 8 karakter, termasuk huruf
                        besar dan angka
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] font-medium text-sm">
                    Ulangi Kata Sandi Baru
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg ${
                      confirmPassword
                        ? confirmPassword === password
                          ? "border-[#2A629A]"
                          : "border-red-500"
                        : "border-[#8A8A8A]"
                    }`}
                  >
                    <input
                      type={confirmPasswordInputType}
                      value={confirmPassword}
                      onChange={handleInput}
                      id="confirmPassword"
                      placeholder="••••••••••"
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                    />
                    {showConfirmPassword ? (
                      <FiEye
                        className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer flex-shrink-0"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <FiEyeOff
                        className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer flex-shrink-0"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )}
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <div className="flex items-center text-red-500 text-xs mt-1 text-left">
                      <BiErrorCircle className="w-[20px] h-[20px] mr-1.5 flex-shrink-0" />
                      <p>Kata sandi tidak cocok</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-[#2A629A] text-white font-medium text-sm p-2 rounded-xl focus:outline-none w-full transition-colors duration:300 hover:bg-[#003285] active:bg-[#003285]"
                  >
                    Atur Ulang
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
};

export default ForgotPassword;
