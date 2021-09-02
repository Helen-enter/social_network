import React from "react";
import {
    ActionsType,
    dialogsDataType,
    messagesDataType,
    postsDataType,
    SendMessageType,
    UpdateNewMessageBodyType
} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

type InitialStateType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
    newMessageBody: string
}

let initialState: InitialStateType = {
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Yo'}
    ],
    dialogsData: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    newMessageBody: ''
}

const dialogsReducer = (state= initialState, action: ActionsType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messagesData.push({id: 6, message: body})
            return state;
        default:
            return state;
    }
}

export const sendMessage = (): SendMessageType => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body: string): UpdateNewMessageBodyType => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
})

export default dialogsReducer;