import React from "react";
import Button from "@mui/material/Button";
import GroupIcon from '@mui/icons-material/Group';

const DisplayFriends = ({ toggleSidebar }) => {
    const handleOpenFriends = () => {
      toggleSidebar();
    };
  
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
          background: "linear-gradient(135deg, rgb(100, 72, 255), rgb(0, 217, 173))",
        }}
        onClick={handleOpenFriends}
      >
        <GroupIcon />
      </Button>
    );
  };
  
  export default DisplayFriends;
  