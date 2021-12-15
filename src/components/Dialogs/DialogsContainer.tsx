import React from "react";
import {StateType, StoreType} from "../../redux/store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";

/*export type DialogsContainerType = {
    store: StoreType
}*/

/*export const DialogsContainer = (props: DialogsContainerType) => {

    let state = props.store.getState().messagesPage

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageAC())
    }

    let onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyAC(body))
    }
    return (<Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} messagesPage={state}/>)
}*/

let mapStateToProps = (state: StateType) => {
    return {
        messagesPage: state.messagesPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyAC(body)),
        sendMessage: () => dispatch(sendMessageAC())
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)