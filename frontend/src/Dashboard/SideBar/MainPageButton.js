import React from "react";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from "react-router-dom";

const MainPageButton = () => {
  const history = useHistory();

  const handleMoveToHome = () => {
    history.push("/home");

  }

  return (
    <Button
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5F8575",
      }}
    >
      <HomeIcon onClick={handleMoveToHome} />
    </Button>
  );
};

export default MainPageButton;
