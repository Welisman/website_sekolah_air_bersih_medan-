import React from "react";
import '../style/atoms/ActionButton.css'

const ActionButton = ({ type, onClick, textButton, value}) => {
    return (
        // <Box sx={{'& button' : {m : 1}}} >
        //     <Button size="medium">Login</Button>
        // </Box>
        <button
            className="btn-main"
            type={type}
            onClick={onClick}>
            {textButton}
        </button>
    );
};
export default ActionButton;