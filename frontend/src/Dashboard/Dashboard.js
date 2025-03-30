import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Sidebar from "./SideBar/Sidebar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import Room from "./Room/Room";
import TechniquesWidget from "./SideBar/TechniquesWidget";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },

});

const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, [setUserDetails]); //added setUserDetails in the dependency array here

  return (
    <Wrapper>
      <Sidebar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      { isUserInRoom && <Room /> }
      {/* { <TechniquesWidget />} */}
    </Wrapper>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
