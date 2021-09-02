import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";
import {sendMessage, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {StoreType} from "../../redux/store";

type DialogsType = {
    store: StoreType
}

const Dialogs = (props: DialogsType) => {
debugger;
    let state = props.store.getState().messagesPage

    let dialogsEl = state.dialogsData
    let messagesEl = state.messagesData
    let newMessageBody = state.newMessageBody

    let dialogsElements = dialogsEl.map((d: { name: string; id: number; }) => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = messagesEl.map((m: { message: string; id: number; }) => <Message message={m.message} id = {m.id} />)

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessage())
    }
    let onNewMessageChange = (e: any) => {
        let body = e.target.value
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder='enter your message'></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;