import { useHistory } from "react-router-dom";
import one from '../shared/images/one.png';
import hero from '../shared/images/hero.png'

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
                <span className="typing-text">Are you ready to start Study Doubling?</span>
                <br />
                <div class="button_slide slide_right">Learn More!</div>
                </div>
                <img
                    src={hero}
                    alt="People working online"
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
