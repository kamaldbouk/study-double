// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { getUserProfile } from "../api";
// import one from '../shared/images/one.png';
// import Avatar from '../shared/components/Avatar';
// import StarIcon from '@mui/icons-material/Star';
// import load from '../shared/images/load.gif';

// const PersonalProfile2 = () => {
//   const history = useHistory();
//   const [profile, setProfile] = useState(null); 
//   const [loading, setLoading] = useState(true); 

//   const handleMoveToDashboard = () => history.push("/dashboard");
//   const handleMoveToExplore = () => history.push("/explore");
//   const handleMoveToEdit = () => history.push("/edit-my-profile");

//   const user = JSON.parse(localStorage.getItem("user"));
//   const id = user ? user._id : null;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const result = await getUserProfile(id);
//       if (!result.error) {
//         setProfile(result);
//       } else {
//         setProfile(null); 
//       }
//       setLoading(false); 
//     };
//     fetchProfile();
//   }, [id]); 

//   if (loading) return <img src={load} alt="Loading..." className="loading"/>;

//   if (!profile) return <div>Profile not found.</div>;

//   return (
//     <div className="profile-container">
//       <nav className="navbar">
//         <div className="navbarContent1">
//           <img src={one} alt="Logo" className="navbarImg" />
//           <h2>StudyDouble</h2>
//           <img src={one} alt="Logo" className="navbarImg" />
//         </div>
//         <div className="navbarContent2">
//           <button className="navbarButton" onClick={handleMoveToDashboard}>Dashboard</button>
//           <button className="navbarButton" onClick={handleMoveToExplore}>Explore</button>
//         </div>
//       </nav>

//       <div className="profileWrapper">
//         <div className="leftSide">
//           <div className="userInfo">
//             <Avatar username={profile.name} large={true} className="avatar-class" />
//             <h3>{profile.name}</h3>
//           </div>
//           <div className="star-rating">
//             {[...Array(5)].map((_, index) => (
//               <StarIcon key={index} className="star" />
//             ))}
//           </div>
//           <p>{profile.biography}</p>
//           <button className="editProfileButton" onClick={handleMoveToEdit}>Edit Profile</button>
//         </div>
//         <div className="middleBox">
//           <h2>Profile Information</h2>
//           <div className="profileDetails">
//             <div className="profile-info">
//               <p><strong>Full Name:</strong> {profile.name}</p>
//               <p><strong>Age:</strong> {profile.age}</p>
//               <p><strong>Location:</strong> {profile.country}</p>
//               <p><strong>Major:</strong> {profile.major}</p>
//               <p><strong>Communication Style:</strong> {profile.communicationStyles}</p>
//               <p><strong>Preferred Study Technique:</strong> {profile.preferredStudyTechnique}</p>
//             </div>
//             <div className="session-pref">
//               session
//             </div>
//             <button>Profile Info</button>
//             <button>Session Preferences</button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PersonalProfile2;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../api";
import one from '../shared/images/one.png';
import Avatar from '../shared/components/Avatar';
import load from '../shared/images/load.gif';
import { Switch } from '@mui/material';

const PersonalProfile2 = () => {
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSessionPref, setIsSessionPref] = useState(false); 
  const [activeButton, setActiveButton] = useState("profile");

  const handleMoveToDashboard = () => history.push("/dashboard");
  const handleMoveToExplore = () => history.push("/explore");
  const handleMoveToEdit = () => history.push("/edit-my-profile");

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

  if (loading) return <img src={load} alt="Loading..." className="loading" />;

  if (!profile) return <div>Profile not found.</div>;

  const handleToggleChange = (event) => {
    setIsSessionPref(event.target.checked);
    setActiveButton(event.target.checked ? "session" : "profile");
  };

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
          <p>{profile.biography}</p>
          <button className="editProfileButton" onClick={handleMoveToEdit}>Edit Profile</button>
          <p>Profile Information</p>
          <Switch
            checked={isSessionPref}
            onChange={handleToggleChange}
            name="profileToggle"
            inputProps={{ 'aria-label': 'Profile Info / Session Preferences toggle' }}
          />
          <p>Session Information</p>
        </div>

        <div className="middleBox">
          {isSessionPref ? (
            <div className="session-pref">
            <h2>Session Preferences</h2>
            
            <div className="preference-box">
              <p><strong>Preferred Study Technique:</strong></p>
              <div className="box">
                <p>{profile.preferredStudyTechnique}</p>
              </div>
            </div>
            
            <div className="preference-box">
              <p><strong>Preferred Study Length:</strong></p>
              <div className="box">
                <p>{profile.preferredStudyLength}</p>
                <p>minutes</p>
              </div>
            </div>
          
            <div className="preference-box">
              <p><strong>Preferred Break Length:</strong></p>
              <div className="box">
                <p>{profile.preferredBreakLength}</p>
                <p>minutes</p>
              </div>
            </div>
          </div>
          
          ) : (
            <div className="profileDetails">
              <h2>Profile Information</h2>
              <div className="profile-info">
                <p><strong>Email:</strong> {profile.mail}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Location:</strong> {profile.country}</p>
                <p><strong>Major:</strong> {profile.major}</p>
                <p><strong>Communication Style:</strong> {profile.communicationStyles}</p>
                <p><strong>Preferred Study Technique:</strong> {profile.preferredStudyTechnique}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="reviewsSection">
        <h2>User Reviews</h2>
        {profile.reviews && profile.reviews.length > 0 ? (
          profile.reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>Rating:</strong> {review.rating} ⭐</p>
              <p>{review.description}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default PersonalProfile2;
