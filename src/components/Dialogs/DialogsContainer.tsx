import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";
import {sendMessage, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import store, {StoreType} from "../../redux/store";
import Dialogs from "./Dialogs";

type DialogsType = {
    store: StoreType
}

const DialogsContainer = (props: DialogsType) => {
    let state = props.store.getState().messagesPage

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessage())
    }
    let onNewMessageChange = (body: any) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }
    return <Dialogs updateNewMessageBody={onNewMessageChange}
                    sendMessage={onSendMessageClick}
                    messagesPage={state}
    />
}

export default DialogsContainer;