import s from "../Dialogs.module.css";
import React from "react";

type MessageType = {
    message: string
}

export const Message = (props: MessageType) => <div className={s.message}>{props.message}</div>