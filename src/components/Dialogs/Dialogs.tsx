import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {MessagesPageType} from "../../redux/store";

export type DialogsType = {
    messagesPage: MessagesPageType
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

export const Dialogs = (props: DialogsType) => {

   // let state = props.messagesPage

    let dialogsElements = props.messagesPage.dialogsData.map(d => <DialogItem id={d.id} name={d.name}/>)
    let messagesElements = props.messagesPage.messagesData.map((m) => <Message id={m.id} message={m.message}/>)
    let newMessagesBody = props.messagesPage.newMessageBody

    let onSendMessageClick = () => {
        props.sendMessage()
    }

    let onNewMessageChange = (e: React.ChangeEvent<any>) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea placeholder={'enter your message'}
                                   value={newMessagesBody}
                                   onChange={onNewMessageChange}>
                    </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}