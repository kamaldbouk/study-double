// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import one from "../shared/images/one.png";
// import { sendFriendInvitation } from "../api";
// import Snackbar from "@mui/material/Snackbar"; 
// import Alert from "@mui/material/Alert";  

// const Explore = () => {
//   const history = useHistory();
//   const [users, setUsers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loadingMail, setLoadingMail] = useState(null); 

//   useEffect(() => {
//     fetch("http://localhost:5002/api/profile")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const handleMoveToDashboard = () => history.push("/dashboard");
//   const handleMoveToExplore = () => history.push("/explore");

//   const handleAddFriend = async (mail) => {
//     setLoadingMail(mail); 
//     console.log("Target mail address:", mail);
//     try {
//       await sendFriendInvitation({
//         targetMailAddress: mail,
//       });

//       setSuccessMessage(`Friend invitation sent to ${mail}`);
//       setLoadingMail(null);
//     } catch (error) {
//         console.error(error); //future kamal this is not showing up plz help 
//       setErrorMessage("Failed to send friend invitation.");
//       setLoadingMail(null);
//     }
//   };

//   return (
//     <div>
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

//       <div className="explore-content">
//         <h2>Get started exploring Study Doubles!</h2>
        
//         <div className="user-cards-container">
//           {users.length > 0 ? (
//             users.map((user) => (
//               <div key={user.userId} className="user-card">
//                 <h3>{user.name}, {user.age}</h3>
//                 <p><strong>Major:</strong> {user.major}</p>
//                 <p><strong>Country:</strong> {user.country}</p>
//                 <p><strong>Study Technique:</strong> {user.preferredStudyTechnique}</p>
//                 <button 
//                   className="addFriendButton2" 
//                   onClick={() => handleAddFriend(user.mail)}
//                   disabled={loadingMail === user.mail} 
//                 >
//                   {loadingMail === user.mail ? "Sending..." : "Add Friend"}
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="loading-text">Loading users...</p>
//           )}
//         </div>
//       </div>

//       <Snackbar
//         open={Boolean(successMessage)}
//         autoHideDuration={3000}
//         onClose={() => setSuccessMessage("")}
//       >
//         <Alert onClose={() => setSuccessMessage("")} severity="success">
//           {successMessage}
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={Boolean(errorMessage)}
//         autoHideDuration={3000}
//         onClose={() => setErrorMessage("")}
//       >
//         <Alert onClose={() => setErrorMessage("")} severity="error">
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Explore;

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import one from "../shared/images/one.png";
import { sendFriendInvitation, checkFriendStatus, removeFriend } from "../api";
import Snackbar from "@mui/material/Snackbar"; 
import Alert from "@mui/material/Alert";  

const Explore = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [friendStatuses, setFriendStatuses] = useState({});
  const [pendingRequests, setPendingRequests] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingMail, setLoadingMail] = useState(null);

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userId = userDetails ? userDetails._id : null;

  useEffect(() => {
    const fetchUsersAndStatuses = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/profile");
        const data = await response.json();
        setUsers(data);

        const statuses = {};
        const pending = {};

        for (const user of data) {
          if (userId && user.userId) {
            const friendStatusResult = await checkFriendStatus(userId, user.userId);
            statuses[user.userId] = friendStatusResult.isFriend;

            const pendingResult = await fetch(
              `http://localhost:5002/api/friends/checkInvitation/${userId}/${user.userId}`
            );
            const pendingData = await pendingResult.json();
            pending[user.userId] = pendingData.pending;
          }
        }

        setFriendStatuses(statuses);
        setPendingRequests(pending);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersAndStatuses();
  }, [userId]);

  const handleAddFriend = async (user) => {
    setLoadingMail(user.mail);
    try {
      await sendFriendInvitation({ targetMailAddress: user.mail });
      setSuccessMessage(`Friend invitation sent to ${user.name}`);
      setPendingRequests((prev) => ({ ...prev, [user.userId]: true }));
    } catch (error) {
      setErrorMessage("Failed to send friend invitation.");
    } finally {
      setLoadingMail(null);
    }
  };

  const handleRemoveFriend = async (user) => {
    setLoadingMail(user.mail);
    try {
      const result = await removeFriend(userId, user.userId);
      if (!result.error) {
        setSuccessMessage(`You have removed ${user.name} from your friends.`);
        setFriendStatuses((prev) => ({ ...prev, [user.userId]: false }));
      } else {
        setErrorMessage("Failed to remove friend.");
      }
    } catch (error) {
      setErrorMessage("Failed to remove friend.");
    } finally {
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
          <button className="navbarButton" onClick={() => history.push("/dashboard")}>Dashboard</button>
          <button className="navbarButton" onClick={() => history.push("/explore")}>Explore</button>
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

                {pendingRequests[user.userId] ? (
                  <button className="pendingButton" disabled>Pending</button>
                ) : friendStatuses[user.userId] ? (
                  <button 
                    className="removeFriendButton" 
                    onClick={() => handleRemoveFriend(user)} 
                    disabled={loadingMail === user.mail}
                  >
                    {loadingMail === user.mail ? "Removing..." : "Remove Friend"}
                  </button>
                ) : (
                  <button 
                    className="addFriendButton2" 
                    onClick={() => handleAddFriend(user)}
                    disabled={loadingMail === user.mail}
                  >
                    {loadingMail === user.mail ? "Sending..." : "Add Friend"}
                  </button>
                )}
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

