import { useHistory } from "react-router-dom";

const Explore = () => {
    const history = useHistory();

    const handleMoveToDashboard = () => {
        history.push("/dashboard"); 
    };
    
    return ( 
        <div>
            Explore
            <button onClick={handleMoveToDashboard}>My Dashboard</button>
        </div>
     );
}
 
export default Explore;