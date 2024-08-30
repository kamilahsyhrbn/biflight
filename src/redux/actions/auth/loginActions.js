import axios from "axios";
import toast from "react-hot-toast";
import {
  setUser,
  setToken,
  clearError,
  setLoading,
  setIsLoggedIn,
  setShowPassword,
} from "../../reducers/auth/loginReducers";
import { setProfile } from "../../reducers/user/userReducers";
import { setNotifikasi } from "../../reducers/flight/notificationReducers";
import { setTransactions } from "../../reducers/flight/transactionReducers";

// Action untuk login dengan Email
export const login = (email, password, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const responseLogin = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("response login", responseLogin);
    if (responseLogin?.status === 200) {
      dispatch(setUser(responseLogin?.data)); // Mengatur setUser ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
      dispatch(setToken(responseLogin?.data?.data?.token));
      // console.log("Token: ", responseLogin?.data?.data?.token);
      dispatch(setIsLoggedIn(true)); // Mengatur setIsLoggedIn menjadi true ke Reducers
      dispatch(setShowPassword(false));
      toast.success("Berhasil masuk, selamat menikmati perjalananmu!", {
        //Menampilkan toast sukses
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
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // console.log("Response Login: ", responseLogin?.data);
  } catch (error) {
    if (error?.response?.data?.message === "Pengguna tidak ditemukan") {
      toast.error("Maaf, alamat Email tidak terdaftar! Silakan daftar akun.", {
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
      });
    } else if (error?.response?.data?.message === "Password salah") {
      toast.error(
        "Maaf, kata sandi salah! Masukkan kata sandi Anda dengan benar.",
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
    } else {
      // dispatch(setError("Email dan password salah. Silakan coba lagi"));
      toast.error("Email atau kata sandi salah. Silakan coba lagi", {
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
      });
    }
  } finally {
    dispatch(setLoading(false));
  }
};

// Action untuk login dengan Google
export const loginWithGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    const responseLoginGoogle = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/google`,
      {
        access_token: accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = responseLoginGoogle.data.tokenJWT; // Mendapatkan token dari response data
    dispatch(setUser(responseLoginGoogle?.data.data)); // Mengatur data pengguna ke Reducers
    // console.log("Cek: ", responseLoginGoogle?.data.data);
    dispatch(clearError()); // Menghapus error ke Reducers
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true)); // Mengatur setIsLoggedIn menjadi true ke Reducers
    toast.success(
      "Berhasil masuk dengan akun Google, selamat menikmati perjalananmu!",
      {
        //Menampilkan toast sukses
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
        // duration: 3000,
      }
    );
    setTimeout(() => {
      navigate("/", { state: { token: token } });
    }, 3000);
    // console.log("Response Login Google: ", responseLoginGoogle.data.tokenJWT);
  } catch (error) {
    // console.log(error); // Menampilkan error di konsol
    toast.error("Gagal masuk dengan akun Google. Silakan coba lagi.", {
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

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch(setToken(null)); // MENGHAPUS TOKEN
    dispatch(setIsLoggedIn(false)); // MENGEMBALIKAN JADI FALSE
    dispatch(setProfile([])); // MENGHAPUS DATA PROFIL
    dispatch(setNotifikasi([])); // MENGHAPUS DATA NOTIFIKASI
    dispatch(setTransactions([])); // MENGHAPUS RIWAYAT PEMESANAN
    if (navigate) {
      navigate("/"); // KE HOME
      toast("Terima kasih, sampai jumpa!", {
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
      });
    }
  } catch (error) {
    // console.log("error logout", error);
  }
};

// CHECK TOKEN UNTUK PROTECTED
export const checkToken = (navigate) => (dispatch, getState) => {
  const { token, isLoggedin } = getState().login;
  if (token === null || isLoggedin === false) {
    navigate("/login");
    setTimeout(() => {
      toast("Maaf, Anda harus masuk terlebih dahulu!", {
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
    }, 10);
  }
};

export const checkIsLoggedIn = (navigate) => (dispatch, getState) => {
  const { token, isLoggedin } = getState().login;
  if (token) {
    navigate("/");
    setTimeout(() => {
      toast("Maaf, Anda sudah masuk!", {
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
    }, 1);
  }
};
