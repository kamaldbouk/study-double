import ListAltIcon from '@mui/icons-material/ListAlt';
import Button from "@mui/material/Button";

const GoalsWidget = () => {
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
      <ListAltIcon />
    </Button>
     );
}
 
export default GoalsWidget;