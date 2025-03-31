import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserProfile, sendFriendInvitation, checkFriendStatus, removeFriend } from "../api";
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
  const [loadingMail, setLoadingMail] = useState(false);
  const [isFriend, setIsFriend] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingRequest, setPendingRequest] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userId = userDetails._id;

  useEffect(() => {
    const fetchProfileAndStatus = async () => {
      try {
        const profileResult = await getUserProfile(id);
        if (!profileResult.error) {
          setProfile(profileResult);
        }
        
        if (userId && id) {
          const friendStatusResult = await checkFriendStatus(userId, id);
          if (!friendStatusResult.error) {
            setIsFriend(friendStatusResult.isFriend);
          }
          const pendingResult = await fetch(`http://localhost:5002/api/friends/checkInvitation/${userId}/${id}`);
          const pendingData = await pendingResult.json();

          // console.log('pending:', pendingData.pending);
          if (pendingData.pending) {
            setPendingRequest(true);
          }
        }
      } catch (error) {
        setErrorMessage("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileAndStatus();

  }, [id, userId]);
  

  const handleAddFriend = async () => {
    setLoadingMail(true);
    try {
      await sendFriendInvitation({ targetMailAddress: profile.mail });
      setSuccessMessage(`Friend invitation sent to ${profile.name}`);
      setPendingRequest(true);
    } catch (error) {
      setErrorMessage("Failed to send friend invitation.");
    }
    setLoadingMail(false);
  };

  const handleRemoveFriend = async () => {
    setLoadingMail(true);
    try {
      const result = await removeFriend(userId, id);
      
      if (!result.error) {
        setSuccessMessage(`You have removed ${profile.name} from your friends.`);
        setIsFriend(false);
      } else {
        setErrorMessage("Failed to remove friend.");
      }
    } catch (error) {
      setErrorMessage("Failed to remove friend.");
    } finally {
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
          <button className="navbarButton" onClick={() => history.push("/dashboard")}>Dashboard</button>
          <button className="navbarButton" onClick={() => history.push("/explore")}>Explore</button>
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
          
          {(pendingRequest && !isFriend) ? (
            <button className="pendingButton" disabled>
              Pending
            </button>
          ) : isFriend ? (
            <button
              className="removeFriendButton"
              onClick={handleRemoveFriend}
              disabled={loadingMail}
            >
              {loadingMail ? "Removing..." : "Remove Friend"}
            </button>
          ) : (
            <button
              className="addFriendButton"
              onClick={handleAddFriend}
              disabled={loadingMail}
            >
              {loadingMail ? "Sending..." : "Add Friend"}
            </button>
          )}

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
