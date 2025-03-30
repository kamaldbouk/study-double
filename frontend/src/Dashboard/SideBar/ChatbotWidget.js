import SmartToyIcon from '@mui/icons-material/SmartToy';
import Button from "@mui/material/Button";

const ChatbotWidget = () => {
    return ( 
        <Button
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
            }}
            >
      <SmartToyIcon />
    </Button>
     );
}
 
export default ChatbotWidget;