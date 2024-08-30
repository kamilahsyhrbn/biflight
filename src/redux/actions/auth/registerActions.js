import axios from "axios";
import toast from "react-hot-toast";
import {
  clearError,
  setPasswordStrength,
  setLoading,
} from "../../reducers/auth/registerReducers";

// Action untuk registrasi akun
export const register =
  (email, name, password, phone_number, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        dispatch(setPasswordStrength("weak"));
      } else if (password.length >= 10) {
        dispatch(setPasswordStrength("strong"));
      } else {
        dispatch(setPasswordStrength("medium"));
      }

      const responseRegister = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/register`,
        {
          name: name,
          email: email,
          phone_number: phone_number,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        responseRegister?.data?.status === true &&
        responseRegister?.data?.data?.email !== "" &&
        responseRegister?.data?.message === "Pengguna berhasil didaftarkan"
      ) {
        dispatch(clearError());
        setTimeout(() => {
          navigate(`/verify-otp?email=${email}`);
        }, 3000);
        toast.success(
          "Pendaftaran berhasil! Kode OTP sedang dikirim ke Email Anda.",
          {
            // Menampilkan toast sukses
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
      }
      // console.log("Response Register: ", responseRegister?.data);
    } catch (error) {
      if (
        error?.response?.data?.message === "Email atau nomor telepon sudah ada"
      ) {
        toast.error(
          "Pendaftaran gagal! Email atau nomor telepon ini sudah terdaftar.",
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
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
