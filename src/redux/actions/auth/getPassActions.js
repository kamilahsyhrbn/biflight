import toast from "react-hot-toast";
import axios from "axios";

export const getForgetPassAction = (email, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/sent-forgot-password`,
      {
        email: email,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    if (response.data.status === true) {
      toast.success(
        "Tautan berhasil dikirim! Cek Email untuk mengatur ulang kata sandi Anda.",
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
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  } catch (error) {
    // console.log("error", error);
    if (
      error.response.data.message ===
      "Pengguna tidak ditemukan atau belum diverifikasi"
    ) {
      toast.error("Maaf, alamat Email tidak terdaftar! Silakan coba lagi.", {
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
    } else if (error.response.data.message === "Email is invalid") {
      toast.error("Maaf, alamat Email salah! Silakan coba lagi.", {
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
  }
};

export const getUpdatePass =
  (password1, password2, token, navigate) => async (dispatch) => {
    try {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password1)) {
        toast.error(
          "Pastikan kata sandi terdiri dari minimal 8 karakter, mengandung huruf besar, dan angka!",
          {
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
          }
        );
        return;
      }

      if (password1 !== password2) {
        toast.error("Kata sandi tidak cocok!", {
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
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/reset-password`,
        {
          password1: password1,
          password2: password2,
          token: token,
        },

        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      if (response.data.status === true) {
        toast.success("Kata sandi Anda berhasil direset.", {
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
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      // console.log("error ", error);
      if (error?.response?.data?.message === "Password dan token diperlukan") {
        toast.error("Kata sandi Anda tidak terkirim!", {
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
      } else if (error?.response?.data?.message === "Kata sandi tidak cocok") {
        toast.error("Maaf, kata sandi yang Anda masukkan tidak cocok!", {
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
    }
  };
