import axios from "axios";
import toast from "react-hot-toast";
import {
  setCardNumber,
  setCardHolderName,
  setCardHolderNameTouched,
  setCardHolderNameValid,
  setCvv,
  setSelectedMonth,
  setSelectedYear,
  setIsDropdownOpen,
  setError,
  clearError,
  setLoading,
  setPaymentSuccess,
} from "../../reducers/flight/paymentReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

// Fungsi delay untuk menunda eksekusi menggunakan Promise
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Action untuk proses pembayaran
export const processPayment =
  (paymentData, navigate) => async (dispatch, getState) => {
    const { token } = getState().login;
    dispatch(setLoading(true));
    try {
      await delay(5000); // Menunggu selama 5 detik
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/transactions/pay`,
        paymentData,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setPaymentSuccess(true));
        dispatch(clearError());
        // Menampilkan toast sukses
        toast.success("Pembayaran berhasil! Harap cetak tiket Anda.", {
          icon: null,
          style: {
            background: "#28A745", // Background hijau
            color: "#FFFFFF", // Teks putih
            borderRadius: "12px",
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
            width: "full",
            maxWidth: "900px",
          },
          position: "top-center", // Posisi toast
          duration: 3000, // Durasi toast
        });
      }
    } catch (error) {
      console.log("Payment error response:", error.response.data);
      if (error?.response?.status === 401) {
        toast.error("Sesi Anda telah habis. Silakan masuk terlebih dahulu.", {
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
        setTimeout(() => {
          navigate("/login");
        }, 4000);
        dispatch(setToken(null));
        dispatch(setIsLoggedIn(false));
      } else if (error?.response?.data?.message === "Transaksi sudah dibayar") {
        toast.error("Maaf, transaksi ini sudah dibayar. Terima kasih!", {
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
      } else if (error?.response?.data?.message === "Kartu anda tidak valid") {
        toast.error("Maaf, pembayaran gagal. Kartu Anda tidak valid!", {
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
      } else if (
        error?.response?.data?.message === "Kartu anda sudah kadaluarsa"
      ) {
        toast.error("Maaf, pembayaran gagal. Kartu Anda sudah kedaluwarsa!", {
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
      } else {
        toast.error("Maaf, pembayaran gagal! Silakan coba lagi.", {
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
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

// Mengatur ulang state pembayaran ke nilai awal atau kosong
export const resetPaymentState = () => (dispatch) => {
  dispatch(setCardNumber(""));
  dispatch(setCardHolderName(""));
  dispatch(setCardHolderNameTouched(false));
  dispatch(setCardHolderNameValid(false));
  dispatch(setCvv(""));
  dispatch(setSelectedMonth(""));
  dispatch(setSelectedYear(""));
  dispatch(setIsDropdownOpen(false));
  dispatch(setError(null));
  dispatch(setLoading(false));
  dispatch(setPaymentSuccess(false));
};
