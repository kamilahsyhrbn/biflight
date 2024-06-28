import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";
import { printTransactions } from "../../../redux/actions/flight/transactionActions";
import {
  setShowConfirmationModal,
  setShowSuccessModal,
} from "../../../redux/reducers/flight/paymentReducers";
import Navbar from "../../../assets/components/navigations/navbar/Navbar";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import Footer from "../../../assets/components/navigations/Footer";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";

export default function PrintTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const { ticketSelected } = useSelector((state) => state.ticket); // Menggunakan useSelector untuk mengambil data ticketSelected dari state ticket
  const { showConfirmationModal, showSuccessModal } = useSelector(
    (state) => state.payment
  ); // Menggunakan useSelector untuk mengambil data dari state payment

  // Fungsi untuk menampilkan modal konfirmasi cetak tiket
  const handlePrintTicket = async () => {
    dispatch(setShowConfirmationModal(true));
  };

  // Fungsi untuk menangani modal konfirmasi cetak tiket
  const handleConfirmPrint = async () => {
    // console.log(`Konfirmasi tiket kode: ${ticketSelected?.booking_code}`);
    dispatch(setShowConfirmationModal(false));
    try {
      await dispatch(printTransactions(ticketSelected?.booking_code));
      dispatch(setShowSuccessModal(true));
    } catch (error) {
      toast.error("Gagal mencetak tiket Anda! Silakan coba lagi.", {
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
    }
  };

  // Fungsi untuk menutup modal konfirmasi cetak tiket
  const handleCloseModals = () => {
    dispatch(setShowConfirmationModal(false));
    dispatch(setShowSuccessModal(false));
  };

  return (
    <div>
      {isMobile ? <NavbarMobile /> : <Navbar />}

      {/* Komponen Transaksi Sukses */}
      <div
        className={`flex flex-col items-center justify-center min-h-screen bg-[#FFF0DC] p-5 pt-20 ${
          isTablet ? "p-10" : ""
        }`}
      >
        <iframe
          src="https://lottie.host/embed/33de7cc4-47b9-4e8e-8808-b106ba44ab4a/OE5t0VM3o7.json"
          className={`w-[300px] h-[300px] mb-5 ${
            isTablet ? "w-[400px] h-[400px]" : ""
          }`}
        ></iframe>
        <div
          className={`bg-white p-6 rounded-lg shadow-lg text-center w-full ${
            isTablet ? "max-w-[650px] p-8" : "max-w-[400px]"
          }`}
        >
          <h1 className="text-2xl font-bold mb-1 text-[#003285]">Selamat!</h1>
          <p className="text-base font-normal mb-6">
            Transaksi Pembayaran Tiket Sukses!
          </p>
          <div className="flex flex-col space-y-3">
            <button
              onClick={handlePrintTicket}
              className="bg-[#2A629A] text-white text-sm font-medium py-2.5 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
            >
              Cetak Tiket
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 text-gray-800 text-sm font-medium py-2.5 rounded-xl focus:outline-none w-full hover:bg-gray-300 transition-colors duration-300"
            >
              Cari Penerbangan Lain
            </button>
          </div>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />

      {/* Modal Konfirmasi Cetak Tiket */}
      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`relative w-full max-w-[90%] ${
              isTablet ? "md:max-w-[50%]" : "md:max-w-[60%]"
            } lg:max-w-[40%] max-h-full animate__animated animate__zoomIn mx-4`}
          >
            <div className="relative bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Konfirmasi Cetak Tiket
                </h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleCloseModals}
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
                <p className="text-base leading-relaxed text-[#8A8A8A]">
                  Apakah Anda ingin mencetak tiket sekarang?
                </p>
              </div>
              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  onClick={handleCloseModals}
                  className="py-2 px-4 md:px-7 me-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:text-[#2A629A]"
                >
                  Nanti
                </button>
                <button
                  className="text-white bg-[#2A629A] hover:bg-[#3472B0] font-medium rounded-lg text-sm px-5 py-2 text-center"
                  onClick={handleConfirmPrint}
                >
                  Cetak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses Cetak Tiket ke Email */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`relative w-full max-w-[90%] ${
              isTablet ? "md:max-w-[50%]" : "md:max-w-[50%]"
            } lg:max-w-[30%] max-h-full animate__animated animate__zoomIn mx-4`}
          >
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">Sukses!</h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleCloseModals}
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
                <p className="text-base leading-relaxed text-[#8A8A8A]">
                  Tiket berhasil dikirim ke Email Anda!
                </p>
              </div>
              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  className="text-white bg-[#2A629A] hover:bg-[#3472B0] font-medium rounded-lg text-sm px-5 py-2 text-center"
                  onClick={handleCloseModals}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
