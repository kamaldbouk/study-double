import React, { useState, useEffect } from "react";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close"; 
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton"; 

const TechniquesWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTechnique, setSelectedTechnique] = useState("");
    const [time, setTime] = useState(0); 
    const [isRunning, setIsRunning] = useState(false); 
    const [intervalId, setIntervalId] = useState(null);
    const [customTime, setCustomTime] = useState("");

    const techniqueTimes = {
        "Pomodoro": 25 * 60,  
        "Feynman Technique": 15 * 60, 
        "Spaced Repetition": 10 * 60  
    };

    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (selectedTechnique) {
            setTime(techniqueTimes[selectedTechnique]);
        }
    }, [selectedTechnique]);

    const toggleTimer = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
        } else {
            const id = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(id);
                        setIsRunning(false);
                        return prevTime;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setIsRunning(true);
            setIntervalId(id);
        }
    };

    
    const handleCustomTimeChange = (e) => {
        const value = e.target.value;
        const timeInSeconds = parseInt(value) * 60;
        if (!isNaN(timeInSeconds) && timeInSeconds >= 0) {
            setCustomTime(value);
            setTime(timeInSeconds);
        }
    };

    
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                onClick={toggleBox}
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "16px",
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    marginTop: "10px",
                    color: "white",
                    backgroundColor: "#5F8575",
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <TimerIcon />
            </Button>

            {isOpen && (
                <Box
                    component={Paper}
                    elevation={4}
                    sx={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        width: "250px",
                        padding: "10px",
                        backgroundColor: "white",
                        zIndex: 1000,
                        borderRadius: "8px",
                    }}
                >
    
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            zIndex: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        Study Techniques
                    </Typography>

                    <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px" }}>
                        {formatTime(time)}
                    </Typography>

                    <Select
                        fullWidth
                        value={selectedTechnique}
                        onChange={(e) => setSelectedTechnique(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select a Technique</MenuItem>
                        <MenuItem value="Pomodoro">Pomodoro</MenuItem>
                        <MenuItem value="Feynman Technique">Feynman Technique</MenuItem>
                        <MenuItem value="Spaced Repetition">Spaced Repetition</MenuItem>
                    </Select>

                    <TextField
                        label="Custom Time (minutes)"
                        value={customTime}
                        onChange={handleCustomTimeChange}
                        type="number"
                        fullWidth
                        sx={{ marginTop: "10px" }}
                    />

                    <Button
                        onClick={toggleTimer}
                        variant="contained"
                        color={isRunning ? "secondary" : "primary"}
                        fullWidth
                        sx={{ marginTop: "10px" }}
                    >
                        {isRunning ? "Stop" : "Start"}
                    </Button>
                </Box>
            )}
        </>
    );
};

export default TechniquesWidget;