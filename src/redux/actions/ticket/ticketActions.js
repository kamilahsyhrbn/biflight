import axios from "axios";
import toast from "react-hot-toast";
import { setPassengers, setTicket } from "../../reducers/ticket/ticketReducers";

export const getTicket =
  (flights, total_adult, total_children, total_baby, orderer, passengers) =>
  async (dispatch, getState) => {
    try {
      const { token } = getState().login;
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/tickets`,
        {
          flights,
          total_adult,
          total_children,
          total_baby,
          orderer,
          passengers,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response ticket", response.data);
      if (response?.data?.status === true) {
        dispatch(setTicket(response?.data?.data));
        toast.success(
          "Data Anda berhasil disimpan! Silakan lanjutkan pembayaran.",
          {
            icon: null,
            style: {
              background: "#28A745",
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
          }
        );
      }
      return response.data;
    } catch (error) {
      // console.log("Error during ticket retrieval ", error);
    }
  };

export const getPassenger = (ticketId) => async (dispatch, getState) => {
  try {
    const { token } = getState().login;
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/tickets/${ticketId}/passengers`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("response passengers", response.data);
    dispatch(setPassengers(response?.data?.data));
    return response.data;
  } catch (error) {
    // console.log("Error during passenger retrieval", error);
  }
};
