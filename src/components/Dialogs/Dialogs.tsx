import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";

type dialogsDataType = {
    id: number
    name: string
}

type messagesDataType = {
    id: number
    message: string
}


type messagesPageType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
}

type DialogsType = {
    state: messagesPageType
}

const Dialogs = (props: DialogsType) => {

    let dialogsEl = props.state.dialogsData
    let messagesEl = props.state.messagesData

    let dialogsElements = dialogsEl.map((d: { name: string; id: number; }) => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = messagesEl.map((m: { message: string; id: number; }) => <Message message={m.message} id = {m.id} />);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;