import React from "react";

const LoginDecor = () => {
  return (
    <div style={{
      width: "300px",  // Adjust width to match AuthBox proportionally
      height: "400px", // Same height as AuthBox
      backgroundColor: "#fff", 
      borderRadius: "5px",
      boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      textAlign: "center"
    }}>
      <img 
        src="/path-to-your-image.jpg" 
        alt="Decor" 
        style={{ width: "80%", height: "auto", marginBottom: "15px" }} 
      />
      <p style={{ color: "#333", fontSize: "16px" }}>
        Welcome to our platform! Sign in to continue.
      </p>
    </div>
  );
};

export default LoginDecor;
