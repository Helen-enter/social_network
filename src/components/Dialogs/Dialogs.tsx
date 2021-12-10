import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {StoreType} from "../../redux/store";
import { sendMessageAC, updateNewMessageBodyAC } from "../../redux/dialogs-reducer";

export type DialogsType = {
    store: StoreType
}

export const Dialogs = (props: DialogsType) => {

    let state = props.store.getState()

    let dialogsElements = state.messagesPage.dialogsData.map(d => <DialogItem id={d.id} name={d.name}/>)
    let messagesElements = state.messagesPage.messagesData.map((m) => <Message id={m.id} message={m.message}/>)
    let newMessagesBody = state.messagesPage.newMessageBody

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageAC())
    }

    let onNewMessageChange = (e: React.ChangeEvent<any>) => {
        let body = e.target.value
        props.store.dispatch(updateNewMessageBodyAC(body))
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