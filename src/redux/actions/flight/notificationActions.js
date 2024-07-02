import axios from "axios";
import toast from "react-hot-toast";
import {
  setIsLoading,
  setNotifikasi,
  setUpdateNotifikasi,
} from "../../reducers/flight/notificationReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

export const getNotification = () => async (dispatch, getState) => {
  const { token } = getState().login;
  dispatch(setIsLoading(true));

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/notifications`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch(setNotifikasi(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    // console.log(error);
    dispatch(setNotifikasi([]));
    dispatch(setIsLoading(false));
    if (error?.response?.status === 403) {
      dispatch(setToken(null));
      dispatch(setIsLoggedIn(false));
    } else if (error?.response?.status !== 400) {
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

export const UpdateNotifications = (id) => async (dispatch, getState) => {
  const { token } = getState().login;
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_SERVER}/notifications/${id}`,
      null,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("response update notif", response);
    if (response.status === 200) {
      dispatch(setUpdateNotifikasi(response?.data));
      toast("Notifikasi telah dibaca!", {
        style: {
          background: "#28A745", // Background Hijau
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
  } catch (error) {
    // console.log("error update notif", error);
    toast("Terjadi Kesalahan", {
      style: {
        background: "#FF0000", // Background Merah
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
};

export const readAllNotifications = () => async (dispatch, getState) => {
  const { token } = getState().login;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/notifications/mark-all`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch(getNotification());
      toast("Semua notifikasi sudah dibaca!", {
        style: {
          background: "#28A745", // Background hijau
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
  } catch (error) {
    // console.log(error);
  }
};
