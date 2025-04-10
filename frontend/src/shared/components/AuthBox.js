import React from "react";
import { useLocation } from "react-router-dom";


const AuthBox = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className={`box-wrapper ${isLogin ? "login-bg" : "register-bg"}`}>
      <div className="auth-box">
        {children}
      </div>
    </div>
  );
};

export default AuthBox;
