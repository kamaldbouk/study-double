import { useHistory } from "react-router-dom";
import one from '../shared/images/one.png';

const Home = () => {
    const history = useHistory();

    const handleMoveToLogin = () => {
        history.push("/login"); 
    };
    const handleMoveToRegister = () => {
        history.push("/register"); 
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
                    <button className="navbarButton" onClick={handleMoveToLogin}>Login</button>
                    <button className="navbarButton" onClick={handleMoveToRegister}>Register</button>
                </div>
            </nav>

            <section className="firstSection">
                <div className="textContainer">
                    <h1>Welcome to Our Site</h1>
                    <p>Explore and get started today!</p>
                    <button className="button">Get Started</button>
                </div>
                <img
                    src="https://via.placeholder.com/400"
                    alt="Placeholder"
                    className="image"
                />
            </section>

            <section className="secondSection"></section>

            <section className="thirdSection"></section>

            <footer className="footer">
                <p>&copy; 2025 Kamal&Mohammad. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
