import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../../redux/actions/auth/loginActions";

export default function LoginGoogle({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Menghandle login dengan Google
  const handleLoginWithGoogle = async (responseGoogle) => {
    const accessToken = responseGoogle.access_token; // Mendapatkan access token dari response Google
    dispatch(loginWithGoogle(accessToken, navigate)); // Memanggil fungsi loginWithGoogle dengan access token dan fungsi navigate
  };

  // Menggunakan useGoogleLogin untuk login dengan Google
  const googleLoginHandler = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      // localStorage.setItem("login", "google function"); // Menyimpan informasi login di local storage
      handleLoginWithGoogle(responseGoogle); // Memanggil fungsi handleLoginWithGoogle dengan response Google
    },
  });

  return (
    <button
      onClick={googleLoginHandler}
      className="bg-white text-[#2A629A] text-sm font-medium border border-[#8A8A8A] focus-within:border-[#8A8A8A] p-2 rounded-xl w-full transition-colors duration-300 hover:bg-[#8A8A8A] active:bg-[#8A8A8A] hover:text-white flex items-center justify-center min-w-0"
    >
      <FcGoogle className="w-5 h-5 mr-3 flex-shrink-0" />
      {buttonText}
    </button>
  );
}
