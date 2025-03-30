import TimerIcon from '@mui/icons-material/Timer';
import Button from "@mui/material/Button";

const TechniquesWidget = () => {
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
      <TimerIcon />
    </Button>
     );
}
 
export default TechniquesWidget;