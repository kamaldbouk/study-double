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

            <section class="secondSection">
                <div class="side default-side">
                    <h1>Study Alone?</h1>
                    <ul>
                        Studying alone can be
                        <li>Demotivating</li>
                        <li>Overwhelming</li>
                        <li>Leads to Procrastination</li>
                        <li>Lack of Focus</li>
                    </ul>
                </div>
                
                <div class="side hover-side">
                    <h1>StudyDouble!</h1>
                    <p>StudyDouble uses the body doubling technique to boost focus and accountability. By matching you with compatible partners, we create a supportive environment for productive and structured study sessions</p>
                </div>
            </section>

            <section className="thirdSection">
                HOW DOES IT WORK
            </section>

            <section className="fourthSection">
                FAQ
            </section>


            <footer className="footer">
                <p>&copy; 2025 Kamal&Mohammad. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
