// import React from "react";
// import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import one from '../shared/images/one.png';

// const PublicProfile = () => {
//   const { id } = useParams();
//   const history = useHistory();

//   const handleMoveToDashboard = () => {
//       history.push("/dashboard"); 
//   };

//   const handleMoveToExplore = () => {
//     history.push("/dashboard"); 
//   };

//   return (
//     <div>
//       <nav className="navbar">
//           <div className="navbarContent1">
//               <img src={one} alt="Logo" className="navbarImg" />
//               <h2>StudyDouble</h2>
//               <img src={one} alt="Logo" className="navbarImg" />
//           </div>
//           <div className="navbarContent2">
//               <button className="navbarButton" onClick={handleMoveToDashboard}>Dashboard</button>
//               <button className="navbarButton" onClick={handleMoveToExplore}>Explore</button>
//           </div>
//       </nav>

//       Profile of user with ID: {id}
//     </div>
//   );
// };

// export default PublicProfile;

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserProfile } from "../api";
import one from '../shared/images/one.png';

const PublicProfile = () => {
  const { id } = useParams();
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleMoveToDashboard = () => history.push("/dashboard");
  const handleMoveToExplore = () => history.push("/explore");

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getUserProfile(id);
      if (!result.error) {
        setProfile(result);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>Profile not found.</div>;

  return (
    <div>
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

      <div className="profileContainer">
        <h2>{profile.name}'s Profile</h2>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
        <p><strong>Country:</strong> {profile.country}</p>
        <p><strong>Major:</strong> {profile.major}</p>
        <p><strong>Communication Style:</strong> {profile.communicationStyles}</p>
        <p><strong>Biography:</strong> {profile.biography}</p>
        <p><strong>Personality Test Results:</strong> {profile.personalityTestResults}</p>
        <p><strong>Preferred Study Technique:</strong> {profile.preferredStudyTechnique}</p>
        <p><strong>Average Session Length:</strong> {profile.averageSessionLength}</p>
      </div>
    </div>
  );
};

export default PublicProfile;
