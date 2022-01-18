import React from "react";
import {ActionsType, DialogsDataType, messagesDataType} from "./store";

const SEND_MESSAGE = 'SEND-MESSAGE'

export type sendMessageACType = ReturnType<typeof sendMessageAC>

export const sendMessageAC = (newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
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
}

export type InitialStateDialogsReducerType = {
    dialogsData: DialogsDataType[]
    messagesData: messagesDataType[]
    newMessageBody?: string
}

export const dialogsReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody
            return  {
                ...state,
                //messagesData: [{id: 6, message: body},...state.messagesData]
                messagesData: [...state.messagesData, {id: 4, message: body}]
            }
        }
        default:
            return state;
    }
}