import React, { useEffect, useState } from "react";
import loadingGif from '../shared/images/load.gif';
// import Avatar from '../shared/components/Avatar';
import InputWithLabel from "../shared/components/InputWithLabel";
import SelectWithLabel from "../shared/components/SelectWithLabel";
import { getUserProfile, updateUserProfile } from "../api";
import { useHistory } from "react-router-dom";

const PersonalProfile = () => {
    const [loading, setLoading] = useState(true); 
    const [profile, setProfile] = useState(null);
    const [bio, setBio] = useState("");
    const [dob, setDob] = useState("");
    const [communication, setCommunication] = useState("");
    const [studyTechnique, setStudyTechnique] = useState("");
    const [country, setCountry] = useState("");
    const [major, setMajor] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    useEffect(() => {
        const fetchProfile = async () => {
            const user = JSON.parse(localStorage.getItem("user")); 
            if (!user || !user._id) {
                setLoading(false);
                return;
            }
            const result = await getUserProfile(user._id);
            if (!result.error) {
                setProfile(result);
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);
    
    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <img src={loadingGif} alt="Loading..." className="loading" />
            </div>
        );
    }

    if (!profile) {
        return <div style={{ textAlign: "center", marginTop: "50px" }}>Profile not found.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.token) {
            setError("Authorization token required");
            return;
        }

        const updatedProfile = {
            biography: bio,
            dob: dob,
            country: country,
            major: major,
            communicationStyles: communication,
            preferredStudyTechnique: studyTechnique,
        };

        try {
            const response = await updateUserProfile(user._id, updatedProfile, user.token);
            if (response.error) {
                setError(response.error);
            } else {
                setProfile(response.data); 
                history.push("/my-profile");
            }
        } catch (error) {
            setError("Failed to update profile.");
            console.error("Error updating profile:", error);
        }
    };

    const countries = ["USA", "Canada", "UK", "Germany", "France"];
    const majors = ["Computer Science", "Engineering", "Business", "Psychology"];
    const communicationStyles = ["Direct", "Casual", "Formal", "Collaborative"];
    const studyTechniques = ["Pomodoro", "Group Study", "Solo Study", "Mind Mapping"];

    return ( 
        <div className="bg">
        <div className="info-container">
            <h2>Welcome, {profile.name}!</h2>
            <p>To get started StudyDoubling, you must complete your profile.</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <InputWithLabel
                value={bio}
                setValue={setBio}
                label="Biography"
                type="text"
                placeholder="Enter your biography"
            />
            <InputWithLabel
                value={dob}
                setValue={setDob}
                label="Date of Birth"
                type="date"
                placeholder="Enter your date of birth"
            />
            <SelectWithLabel
                value={country}
                setValue={setCountry}
                label="Country"
                options={countries}
            />
            <SelectWithLabel
                value={major}
                setValue={setMajor}
                label="Major"
                options={majors}
            />
            <SelectWithLabel
                value={communication}
                setValue={setCommunication}
                label="Communication Style"
                options={communicationStyles}
            />
            <SelectWithLabel
                value={studyTechnique}
                setValue={setStudyTechnique}
                label="Preferred Study Technique"
                options={studyTechniques}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    );
};

export default PersonalProfile;
