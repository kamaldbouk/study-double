import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserProfile, sendFriendInvitation } from "../api";
import one from '../shared/images/one.png';
import Avatar from '../shared/components/Avatar';
import StarIcon from '@mui/icons-material/Star';
import load from '../shared/images/load.gif';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PublicProfile = () => {
  const { id } = useParams();
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingMail, setLoadingMail] = useState(null); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleMoveToDashboard = () => history.push("/dashboard");
  const handleMoveToExplore = () => history.push("/explore");

  useEffect(() => {
    const fetchProfile = async () => {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const myId = userDetails._id;

      const result = await getUserProfile(id);
      if (!result.error) {
        setProfile(result);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [id]);

  const handleAddFriend = async () => {
    setLoadingMail(true); 
    try {
      await sendFriendInvitation({ targetMailAddress: profile.mail });

      setSuccessMessage(`Friend invitation sent to ${profile.name}`);
      setLoadingMail(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to send friend invitation.");
      setLoadingMail(false);
    }
  };

  if (loading) return <img src={load} alt="Loading..." className="loading" />;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="profile-container">
      <nav className="navbar">
        <div className="navbarContent1">
          <img src={one} alt="Logo" className="navbarImg" />
          <h2>StudyDouble</h2>
          <img src={one} alt="Logo" className="navbarImg" />
        </div>
        <div className="navbarContent2">
          <button className="navbarButton" onClick={handleMoveToDashboard}>Dashboard</button>
          <button className="navbarButton" onClick={handleMoveToExplore}>Explore</button>
        </div>
      </nav>

      <div className="profileWrapper">
        <div className="leftSide">
          <div className="userInfo">
            <Avatar username={profile.name} large={true} className="avatar-class" />
            <h3>{profile.name}</h3>
          </div>
          <StarIcon className="star" />
          <p>{profile.biography}</p>
          <button 
            className="addFriendButton" 
            onClick={handleAddFriend}
            disabled={loadingMail}
          >
            {loadingMail ? "Sending..." : "Add StudyDouble"}
          </button>
        </div>

        <div className="middleBox">
          <h2>Profile Information</h2>
          <div className="profileDetails">
            <p><strong>Full Name:</strong> {profile.name}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Location:</strong> {profile.country}</p>
            <p><strong>Major:</strong> {profile.major}</p>
            <p><strong>Communication Style:</strong> {profile.communicationStyles}</p>
            <p><strong>Preferred Study Technique:</strong> {profile.preferredStudyTechnique}</p>
            <p><strong>Average Session Length:</strong> {profile.averageSessionLength} hours</p>
          </div>
        </div>
      </div>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PublicProfile;
