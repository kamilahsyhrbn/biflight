import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import {
  setOtpInput,
  decrementTimer,
  resetTimer,
} from "../../../redux/reducers/auth/otpReducers"; // Import setEmail dan timer actions
import { verifyOtp, resendOtp } from "../../../redux/actions/auth/otpActions";
import backgroundImage from "../../../assets/images/otp.png";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import Footer from "../../../assets/components/navigations/Footer";
import { useMediaQuery } from "react-responsive";

export default function VerifyOTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const registerEmail = useSelector((state) => state.register.email); // Mengambil email dari state register
  const { otpInput, timer } = useSelector((state) => state.otp); // Mengambil otpInput dan timer dari state otp
  const [isToastShown, setIsToastShown] = useState(false); // State untuk memastikan toast hanya muncul sekali
  const [isResendVisible, setIsResendVisible] = useState(false); // State untuk tombol Resend OTP

  // Mengatur ulang state verifikasi OTP ke nilai awal atau kosong
  useEffect(() => {
    // console.log("Email dari state register:", registerEmail);
    dispatch(setOtpInput(""));
    dispatch(resetTimer());

    // Fungsi untuk mengurangi timer setiap detik
    const countdown = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);
    // Membersihkan interval ketika dimuat
    return () => clearInterval(countdown);
  }, [dispatch]);

  // Fungsi untuk menampilkan Email pengguna saat pendaftaran pada halaman verifikasi OTP
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  // Fungsi untuk menyensor Email pengguna pada halaman verifikasi OTP
  const censorEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const censoredLocalPart = localPart[0] + "*".repeat(localPart.length - 1);
    return `${censoredLocalPart}@${domain}`;
  };

  useEffect(() => {
    if (timer <= 0 && !isToastShown) {
      toast.error("Waktu habis! Silakan minta OTP baru.", {
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
      setIsToastShown(true);
      setIsResendVisible(true); // Menampilkan tombol Resend OTP ketika timer habis
    }
  }, [timer, isToastShown]);

  // Fungsi untuk menangani perubahan input OTP
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtpInput = [...otpInput]; // Membuat salinan otpInput
    newOtpInput[index] = element.value; // Mengatur nilai otpInput pada index yang diberikan
    dispatch(setOtpInput(newOtpInput.join(""))); // Menggabungkan array menjadi string dan mengatur otpInput

    // Memindahkan fokus ke input berikutnya jika ada nilai
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Fungsi untuk menangani aksi saat tombol ditekan di input OTP
  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && !otpInput[index] && e.target.previousSibling) {
      e.target.previousSibling.focus(); // Memindahkan fokus ke input sebelumnya jika backspace ditekan dan input kosong
    }
  };

  // Fungsi untuk menangani verifikasi OTP
  const handleVerify = async (event) => {
    event.preventDefault();
    if (otpInput.length < 6) {
      toast.error("Mohon masukkan kode OTP Anda!", {
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
    dispatch(verifyOtp(navigate));
  };

  // Fungsi untuk menangani pengiriman ulang OTP
  const handleResendOtp = () => {
    dispatch(resendOtp(registerEmail));
    setIsToastShown(false); // Mengatur ulang toast
    setIsResendVisible(false); // Menyembunyikan tombol Resend OTP
    dispatch(resetTimer()); // Mereset timer
  };

  // Fungsi untuk menangani format waktu pengiriman ulang OTP
  const formatTime = (time) => {
    // Menghitung jumlah menit dari waktu dalam detik
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    // Menghitung sisa detik setelah konversi ke menit
    const seconds = String(time % 60).padStart(2, "0");
    // Menggabungkan menit dan detik dalam format MM:SS
    return `${minutes}:${seconds}`;
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
          {/* <Toaster /> */}
          <div
            className={`max-w-[400px] w-full rounded-lg p-5 sm:m-8 bg-[#FFF8ED] text-center relative
              ${isTablet ? "max-w-[650px] p-8" : ""}
            `}
          >
            <BiArrowBack
              className="absolute left-4 cursor-pointer text-[#2A629A]"
              size={20}
              onClick={() => navigate("/register")}
            />
            <div className="flex items-center justify-center mt-6">
              <iframe
                src="https://lottie.host/embed/ae805970-6227-486e-813d-6f75e2a6f92f/vKXrur3x5Y.json"
                className=""
              ></iframe>
            </div>
            <div className="max-w-[550px] w-full mx-auto flex flex-col items-center mt-2">
              <h1 className="text-[#003285] text-2xl font-bold text-center w-full mt-3 mb-8">
                Verifikasi Email Anda
              </h1>
              <h2 className="text-[#8A8A8A] text-l mb-5 text-center text-sm font-medium">
                Masukkan 6 Digit Kode OTP yang Dikirim ke <br />
                <span className="font-bold text-[#2A629A]">
                  {email && censorEmail(email)}
                </span>
              </h2>

              <form onSubmit={handleVerify} className="w-full">
                <div className="flex justify-center items-center space-x-2 sm:space-x-3 mt-5">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      name="otp"
                      maxLength="1"
                      value={otpInput[index] || ""}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 sm:w-12 sm:h-12 text-center border border-[#2A629A] rounded-xl focus:border-[#2A629A]"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-[#2A629A] text-white text-sm font-medium p-2 mt-8 mb-5 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                  disabled={timer <= 0} // Menonaktifkan tombol jika timer habis
                >
                  Konfirmasi Kode OTP
                </button>

                <h1 className="text-[#40A2E3] text-l mb-1 text-center text-sm font-medium">
                  {timer > 0 ? (
                    `Waktu tersisa: ${formatTime(Math.max(timer, 0))}`
                  ) : (
                    <span
                      onClick={handleResendOtp}
                      className="cursor-pointer text-[#40A2E3] text-sm hover:underline font-medium"
                    >
                      Kirim Ulang Kode OTP
                    </span>
                  )}
                </h1>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
}
