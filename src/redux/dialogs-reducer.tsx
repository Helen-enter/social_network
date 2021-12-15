import React from "react";
import {addPostACType, updateNewPostTextACType} from "./profile-reducer";
import {DialogsDataType, messagesDataType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export type updateNewMessageBodyACType = ReturnType<typeof updateNewMessageBodyAC>
export type sendMessageACType = ReturnType<typeof sendMessageAC>

export type ActionsType = addPostACType | updateNewPostTextACType | updateNewMessageBodyACType | sendMessageACType

export const updateNewMessageBodyAC = (body: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body
    } as const
}
export const sendMessageAC = () => {
    return {
        type: SEND_MESSAGE
    } as const
}

let InitialState: InitialStateDialogsReducerType = {
    dialogsData: [
        {id: 1, name: 'Petr'},
        {id: 2, name: 'Dmitriy'},
        {id: 3, name: 'Andrey'},
        {id: 4, name: 'Svetlana'},
        {id: 5, name: 'Elena'},
    ],
    messagesData: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Hello)))'},
        {id: 3, message: 'How are you?'},
    ],
    newMessageBody: ''
}

export type InitialStateDialogsReducerType = {
    dialogsData: DialogsDataType[]
    messagesData: messagesDataType[]
    newMessageBody: string
}

export const dialogsReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY": {
            return  {
                ...state,
                newMessageBody: action.body
            }
        }
        case "SEND-MESSAGE": {
            let body = state.newMessageBody
            return  {
                ...state,
                newMessageBody: '',
                messagesData: [{id: 6, message: body},...state.messagesData]
            }
        }
        default:
            return state;
    }
}