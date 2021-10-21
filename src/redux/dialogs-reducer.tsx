import React from "react";
import {
    ActionsType,
    dialogsDataType,
    messagesDataType
} from "./store";

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
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return  {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const sendMessage = (newMessageBody: string): { newMessageBody: string; type: string } => ({type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;