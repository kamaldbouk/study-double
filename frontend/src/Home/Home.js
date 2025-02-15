import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();

    const handleMoveToLogin = () => {
        history.push("/login"); 
    };

    return ( 
        <div>
            Home
            <button onClick={handleMoveToLogin}>login</button>
        </div>
     );
};
 
export default Home;