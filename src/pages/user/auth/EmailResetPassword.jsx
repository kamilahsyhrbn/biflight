import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { getForgetPassAction } from "../../../redux/actions/auth/getPassActions";
import { RxCrossCircled } from "react-icons/rx";
import { BiSolidCheckCircle, BiArrowBack } from "react-icons/bi";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import Footer from "../../../assets/components/navigations/Footer";
import Logobiflight from "../../../assets/images/logobiflight.png";
import Plane from "../../../assets/images/pesawat.png";

const EmailResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Validasi email menggunakan regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(emailValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Mohon masukkan alamat Email Anda!", {
        icon: null,
        style: {
          background: "#FF0000",
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
    if (!isEmailValid) {
      toast.error("Mohon masukkan alamat Email dengan benar!", {
        icon: null,
        style: {
          icon: null,
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

    // Kirim permintaan untuk reset password ke server
    dispatch(getForgetPassAction(email, navigate));
  };

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
            onClick={() => navigate("/login")}
          />
          <Toaster />
          <div className="max-w-[550px] w-full mx-auto flex flex-col items-center mt-5">
            <img
              src={Logobiflight}
              className="w-24 p-1.5"
              alt="BiFlight Logo"
            />
            <h1 className="text-[#003285] text-2xl font-bold text-center w-full mt-3 mb-3">
              Lupa Kata Sandi
            </h1>
            <h2 className="text-[#40A2E3] text-sm font-medium mb-10 text-center w-full">
              <span className="text-[#40A2E3]">Lupa kata sandi</span>
              <span className="text-[#8A8A8A]">? </span>
              <span className="text-[#8A8A8A]">
                Masukkan Email Anda <br />
                untuk mereset kata sandi!
              </span>
            </h2>

            {/* Form Email reset kata sandi */}
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col space-y-1">
                <label className="text-left text-[#2A629A] font-medium text-sm">
                  Email
                </label>
                <div
                  className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg ${
                    email
                      ? isEmailValid
                        ? "focus-within:border-[#2A629A]"
                        : "focus-within:border-red-500"
                      : "focus-within:border-[#2A629A]"
                  } ${
                    !isEmailValid && email
                      ? "border-red-500"
                      : "border-[#8A8A8A]"
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Alamat Email"
                    className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] min-w-0"
                    required
                  />
                  {isEmailValid && email && (
                    <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#28A745] flex-shrink-0" />
                  )}
                  {!isEmailValid && email && (
                    <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] ml-2 flex-shrink-0" />
                  )}
                </div>

                {!isEmailValid && email && (
                  <p className="text-[#FF0000] text-xs text-left">
                    Format Email salah
                  </p>
                )}
              </div>

              {/* Tombol kirim Email untuk mereset kata sandi */}
              <div className="mt-3">
                {" "}
                <button
                  type="submit"
                  className="bg-[#2A629A] text-white font-medium text-sm p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                  onClick={handleSubmit}
                >
                  Kirim
                </button>
              </div>
            </form>

            {/* Mengarahkan ke halaman masuk jika pengguna ingat kata sandi */}
            <p className="text-[#8A8A8A] mt-7 text-sm font-medium">
              Ingat kata sandi Anda?{" "}
              <a
                href="/login"
                className="text-[#40A2E3] font-semibold text-sm hover:underline"
              >
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
};

export default EmailResetPassword;
