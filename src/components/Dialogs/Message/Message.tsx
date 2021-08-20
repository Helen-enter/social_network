import classes from "../Dialogs.module.css";
import React from "react";
import {messagesDataType} from "../../../redux/state";

const Message = (props: messagesDataType) => {
    return (
        <div className={classes.message}>
            {props.message}
        </div>
    )
}

export default Message;