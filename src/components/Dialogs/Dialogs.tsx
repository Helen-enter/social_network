import React from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {MessagesPageType} from "../../redux/store";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import { Textarea } from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators";

export type DialogsType = {
    messagesPage: MessagesPageType
    updateNewMessageBody: (body: string) => void
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
}

export const Dialogs = (props: DialogsType) => {

    let dialogsElements = props.messagesPage.dialogsData.map(d => <DialogItem id={d.id} name={d.name}/>)
    let messagesElements = props.messagesPage.messagesData.map((m) => <Message id={m.id} message={m.message}/>)

    let addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const maxLength100 = maxLengthCreator(100)

export const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} validate={[requiredField, maxLength100]} name={'newMessagesBody'} placeholder={'enter your message'}/>
            <div>
                <button>send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)
