import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import one from "../shared/images/one.png";
import { sendFriendInvitation } from "../api";
import Snackbar from "@mui/material/Snackbar"; 
import Alert from "@mui/material/Alert";  

const Explore = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingMail, setLoadingMail] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:5002/api/profile")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleMoveToDashboard = () => history.push("/dashboard");
  const handleMoveToExplore = () => history.push("/explore");

  const handleAddFriend = async (mail) => {
    setLoadingMail(mail); 
    console.log("Target mail address:", mail);
    try {
      await sendFriendInvitation({
        targetMailAddress: mail,
      });

      setSuccessMessage(`Friend invitation sent to ${mail}`);
      setLoadingMail(null);
    } catch (error) {
        console.error(error); //future kamal this is not showing up plz help 
      setErrorMessage("Failed to send friend invitation.");
      setLoadingMail(null);
    }
  };

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

      <div className="explore-content">
        <h2>Get started exploring Study Doubles!</h2>
        
        <div className="user-cards-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.userId} className="user-card">
                <h3>{user.name}, {user.age}</h3>
                <p><strong>Major:</strong> {user.major}</p>
                <p><strong>Country:</strong> {user.country}</p>
                <p><strong>Study Technique:</strong> {user.preferredStudyTechnique}</p>
                <button 
                  className="addFriendButton2" 
                  onClick={() => handleAddFriend(user.mail)}
                  disabled={loadingMail === user.mail} 
                >
                  {loadingMail === user.mail ? "Sending..." : "Add Friend"}
                </button>
              </div>
            ))
          ) : (
            <p className="loading-text">Loading users...</p>
          )}
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

export default Explore;

