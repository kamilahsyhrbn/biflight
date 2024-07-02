import axios from "axios";
import toast from "react-hot-toast";
import {
  setIsLoading,
  setTransactions,
} from "../../reducers/flight/transactionReducers";
import {
  setLoading,
  setShowConfirmationModal,
  setShowSuccessModal,
} from "../../reducers/flight/paymentReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

// Action untuk mendapatkan data history transaksi
export const getTransactions = (lt, gte, q) => async (dispatch, getState) => {
  const { token } = getState().login;
  dispatch(setIsLoading(true));

  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_SERVER
      }/transactions/history?lt=${lt}&gte=${gte}&q=${q}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(setTransactions(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    // console.log("error", error);
    if (error?.response?.status === 401) {
      dispatch(setToken(null));
      dispatch(setIsLoggedIn(false));
    } else {
      toast("Terjadi kesalahan!", {
        style: {
          background: "#FF0000",
          color: "#FFFFFF", // TEKS PUTIH
          borderRadius: "12px",
          fontSize: "14px", // Ukuran font
          textAlign: "center", // TEKS TENGAH
          padding: "10px 20px", // Padding
          width: "full",
        },
      });
    }
    dispatch(setIsLoading(false));
    dispatch(setTransactions([]));
  }
};

// Action untuk mencetak tiket
export const printTransactions = (id) => async (dispatch, getState) => {
  const { token } = getState().login;
  dispatch(setLoading(true));
  dispatch(setShowSuccessModal(false));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/transactions/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("response print", response);
    if (response?.status === 202) {
      if (location.pathname === "/print-ticket/:booking_code") {
        dispatch(setShowConfirmationModal(false));
        dispatch(setShowSuccessModal(true)); // Tampilkan modal sukses setelah cetak tiket berhasil
        dispatch(setLoading(false));
      } else {
        toast("Tiket berhasil dikirim ke Email Anda!", {
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
    }
  } catch (error) {
    // console.log(
    //   "Print ticket error response: ",
    //   error.response?.data || error.message
    // );
    toast.error("Gagal mencetak tiket! Silakan coba lagi.", {
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
    dispatch(setShowSuccessModal(false));
  }
};

// Action untuk membatalkan transaksi
export const cancelTransactions =
  (bookingCode) => async (dispatch, getState) => {
    const { token } = getState().login;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_SERVER}/transactions/${bookingCode}`,
        { bookingCode },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response cancel", response);
      if (response?.status === 200) {
        toast(response?.data?.message, {
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
      // console.log("error cancel", error);
      toast(error?.response?.data?.message, {
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
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    }
  };
