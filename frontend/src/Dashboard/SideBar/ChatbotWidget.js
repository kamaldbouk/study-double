import { useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
        { inputs: input }, 
        {
          headers: { Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY` },
        }
      );

      const botMessage = { role: "assistant", content: response.data[0].generated_text };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...messages, userMessage, { role: "assistant", content: "Oops! The chatbot is currently unavailable." }]);
    }

    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", left: "10px" }}>
      <Button
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          backgroundColor: "#5F8575",
          color: "white",
          minWidth: "unset",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SmartToyIcon fontSize="small" />
      </Button>

      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: "50px",
            left: "0",
            width: "220px",
            height: "360px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <div style={{ flexGrow: 1, overflowY: "auto", maxHeight: "320px" }}>
            {messages.map((msg, index) => (
              <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
              </p>
            ))}
          </div>

          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        </Box>
      )}
    </div>
  );
};

export default ChatbotWidget;
