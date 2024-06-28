import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../redux/actions/auth/loginActions";

export default function Protected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.login);

  // JIKA TOKEN TIDAK ADA, MAKA AKAN MENAMPILKAN ALERT DAN DIRECT KE LOGIN PAGE
  useEffect(() => {
    dispatch(checkToken(navigate));
  }, [token, isLoggedIn]);

  return;
}
