import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIsLoggedIn } from "../../redux/actions/auth/loginActions";

export default function CheckValidation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // JIKA TOKEN ADA, MAKA AKAN MENAMPILKAN ALERT DAN DIRECT KE HOME PAGE
  useEffect(() => {
    dispatch(checkIsLoggedIn(navigate));
  }, []);

  return;
}
