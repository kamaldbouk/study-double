import React, { useState } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";

const GoalsWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    
    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleAddTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask("");  
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
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
                    background: "linear-gradient(135deg, rgb(100, 72, 255), rgb(0, 217, 173))",
                    position: "relative",
                }}
            >
                <ListAltIcon />
            </Button>
            {isOpen && (
                <Draggable handle=".draggable-header">
                    <Box
                        component={Paper}
                        elevation={4}
                        sx={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            width: "250px",
                            padding: "16px",
                            backgroundColor: "white",
                            zIndex: 1000,
                            borderRadius: "8px",
                            maxHeight: "400px",
                            overflowY: "auto",
                            cursor: "move",
                            boxShadow: 4,
                        }}
                    >
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            className="draggable-header"
                            sx={{ marginBottom: "16px", cursor: "move", fontWeight: 'bold' }}
                        >
                            To-Do List
                        </Typography>

                        <TextField
                            label="New Task"
                            value={task}
                            onChange={handleTaskChange}
                            fullWidth
                            sx={{
                                marginBottom: "16px",
                                input: { fontSize: '14px' },
                                '& .MuiInputLabel-root': { fontSize: '14px' },
                            }}
                        />

                        <Button
                            onClick={handleAddTask}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                        >
                            Add Task
                        </Button>

                        <div>
                            {tasks.map((task, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "8px",
                                        backgroundColor: task.completed ? "#f0f8ff" : "transparent",
                                        borderRadius: "4px",
                                        marginBottom: "8px",
                                        transition: "background-color 0.3s ease",
                                        maxWidth: "100%",
                                    }}
                                >
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(index)}
                                        sx={{
                                            color: task.completed ? "green" : "default",
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textDecoration: task.completed ? "line-through" : "none",
                                            flexGrow: 1,
                                            fontSize: "14px",
                                            color: task.completed ? "#808080" : "black",
                                            transition: "color 0.3s ease",
                                            wordWrap: "break-word", 
                                            whiteSpace: "normal", 
                                        }}
                                    >
                                        {task.text}
                                    </Typography>
                                    <IconButton
                                        onClick={() => deleteTask(index)}
                                        sx={{ padding: 0, color: "#f44336" }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </div>
                    </Box>
                </Draggable>
            )}
        </>
    );
};

export default GoalsWidget;