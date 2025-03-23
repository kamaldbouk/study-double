import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserProfile } from "../api";
import one from '../shared/images/one.png';
import Avatar from '../shared/components/Avatar';
import StarIcon from '@mui/icons-material/Star';
import load from '../shared/images/load.gif';

const PersonalProfile2 = () => {
  const history = useHistory();
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const handleMoveToDashboard = () => history.push("/dashboard");
  const handleMoveToExplore = () => history.push("/explore");
  const handleMoveToEdit = () => history.push("/edit-profile");

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user ? user._id : null;

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getUserProfile(id);
      if (!result.error) {
        setProfile(result);
      } else {
        setProfile(null); 
      }
      setLoading(false); 
    };
    fetchProfile();
  }, [id]); 

  if (loading) return <img src={load} alt="Loading..." className="loading"/>;

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
          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} className="star" />
            ))}
          </div>
          <p>{profile.biography}</p>
          <button className="editProfileButton" onClick={handleMoveToEdit}>Edit Profile</button>
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
    </div>
  );
};

export default PersonalProfile2;
