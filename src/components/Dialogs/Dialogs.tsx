import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";
import {messagesPageType} from "../../redux/store";
import {Redirect} from "react-router-dom";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";

type DialogsType = {
    updateNewMessageBody: (body: any) => void
    sendMessage: (newMessageBody: string) => void
    messagesPage: messagesPageType
    isAuth: any
    newMessageBody: string
}

const Dialogs = (props: DialogsType) => {
    let state = props.messagesPage
    //let newMessageBody = state.newMessageBody

    let dialogsEl = state.dialogsData
    let messagesEl = state.messagesData

    let dialogsElements = dialogsEl.map((d: { name: string; id: number; }) => <DialogItem key={d.id} name={d.name}
                                                                                          id={d.id}/>);
    let messagesElements = messagesEl.map((m: { message: string; id: number; }) => <Message key={m.id}
                                                                                            message={m.message}
                                                                                            id={m.id}/>)
    let addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Redirect to={'/Login'}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const AddMessageForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessageBody' placeholder='enter your message'/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;