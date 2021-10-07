import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";
import {messagesPageType} from "../../redux/store";
import { Redirect } from "react-router-dom";

type DialogsType = {
    updateNewMessageBody: (body: any) => void
    sendMessage: () => void
    messagesPage: messagesPageType
    isAuth : any
}

const Dialogs = (props: DialogsType) => {
    let state = props.messagesPage

    let dialogsEl = state.dialogsData
    let messagesEl = state.messagesData
    let newMessageBody = state.newMessageBody

    let dialogsElements = dialogsEl.map((d: { name: string; id: number; }) => <DialogItem key={d.id} name={d.name}
                                                                                          id={d.id}/>);
    let messagesElements = messagesEl.map((m: { message: string; id: number; }) => <Message key={m.id}
                                                                                            message={m.message}
                                                                                            id={m.id}/>)

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (e: any) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
    }

    if (!props.isAuth) return <Redirect to={'/Login'}/>

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
                                   placeholder='enter your message'/>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;