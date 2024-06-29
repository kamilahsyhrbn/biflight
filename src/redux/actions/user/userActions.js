import axios from "axios";
import toast from "react-hot-toast";
import { setIsLoading, setProfile } from "../../reducers/user/userReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

export const getUser = () => async (dispatch, getState) => {
  const { token } = getState().login;
  // console.log("token", token);
  dispatch(setProfile([]));
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/profile`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("response", response);
    if (response?.data?.status === true) {
      dispatch(setProfile(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    // console.log("error", error);
    if (error?.response?.status === 403) {
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
  }
};

export const updateUser =
  (name, phone_number, navigate) => async (dispatch, getState) => {
    const { token } = getState().login;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/update-profile`,
        {
          name,
          phone_number,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response update profile", response);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/profil");
        }, 10);
        toast("Berhasil mengubah data Anda!", {
          style: {
            background: "#28A745", // Background hijau
            color: "#FFFFFF", // TEKS PUTIH
            borderRadius: "12px",
            fontSize: "14px", // Ukuran font
            textAlign: "center", //TEKS TENGAH
            padding: "10px 20px", // Padding
            width: "full",
            maxWidth: "900px",
          },
          position: "top-center", // Posisi toast
          duration: 3000, // Durasi toast
        });
      }
    } catch (error) {
      // console.log("error update profile", error);
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
  };

export const updatePassword =
  (old_password, new_password) => async (dispatch, getState) => {
    const { token } = getState().login;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/update-password`,
        {
          old_password,
          new_password,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response update password", response);
      if (response.status === 200) {
        toast("Berhasil mengubah kata sandi Anda!", {
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
        return true;
      }
    } catch (error) {
      // console.log("error update password", error);
      if (error?.response?.status === 400) {
        toast("Kata sandi lama yang Anda masukkan salah!", {
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
    }
  };

export const addPassword =
  (password1, password2) => async (dispatch, getState) => {
    const { token } = getState().login;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/new-password`,
        {
          password1,
          password2,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response add password", response);
      if (response.status === 200) {
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
        return true;
      }
    } catch (error) {
      // console.log("error update password", error);
      if (error?.response?.status === 400) {
        toast("Kata sandi lama yang Anda masukkan salah!", {
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
            maxWidth: "900px",
          },
        });
      }
    }
  };

export const deleteUser = (email, navigate) => async (dispatch) => {
  try {
    const response = await axios(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/delete-user/${email}`
    );
    if (navigate) {
      navigate("/");
      setTimeout(() => {
        toast("Berhasil menghapus akun Anda, Sampai jumpa!", {
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
      }, 100);
    }
  } catch (error) {
    toast("Terjadi kesalahan!", {
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
    });
  }
};
