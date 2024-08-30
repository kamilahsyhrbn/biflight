import axios from "axios";
import toast from "react-hot-toast";
import { setLoading, clearError } from "../../reducers/auth/otpReducers";

// Action untuk verifikasi OTP
export const verifyOtp = (navigate) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { otpInput } = getState().otp;
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  try {
    // Membuat permintaan ke API untuk verifikasi OTP
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/verification-otp`,
      { otp_number: otpInput, email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Logging respons dari server
    // console.log("Respons Verifikasi OTP:", response.data);

    if (response.data.status === true) {
      dispatch(clearError());
      toast.success(
        "Verifikasi Email berhasil! Silakan masuk untuk melanjutkan.",
        {
          icon: null,
          style: {
            background: "#28A745",
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
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      throw new Error("Verifikasi OTP gagal.");
    }
  } catch (error) {
    // console.error(
    //   "Error verifying OTP:",
    //   error.response?.data || error.message
    // );
    // dispatch(setError("Kode OTP salah! Silakan coba lagi."));
    toast.error("Kode OTP salah! Silakan coba lagi.", {
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
  } finally {
    dispatch(setLoading(false));
  }
};

// Action untuk mengirim ulang OTP
export const resendOtp = () => async (dispatch) => {
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  // console.log("Email resend otp: ", email);
  try {
    if (!email) {
      throw new Error("Email tidak valid!");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/resend-otp`,
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("Respons Resend OTP:", response.data);

    if (response.data.status === true) {
      dispatch(clearError());
      toast.success("Kode OTP baru telah dikirim ke Email Anda.", {
        icon: null,
        style: {
          background: "#28A745",
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          maxWidth: "900px",
        },
        position: "top-center",
        duration: 3000,
      });
    } else {
      throw new Error("Pengiriman ulang OTP gagal.");
    }
  } catch (error) {
    // console.error(
    //   "Error resending OTP:",
    //   error.response?.data || error.message
    // );
    // dispatch(setError("Gagal mengirim ulang OTP! Silakan coba lagi."));
    toast.error("Gagal mengirim ulang OTP! Silakan coba lagi.", {
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
};
