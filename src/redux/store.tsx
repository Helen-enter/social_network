import React from "react";
import {addPostACType, profileReducer, updateNewPostTextACType} from "./profile-reducer";
import {dialogsReducer, sendMessageACType, updateNewMessageBodyACType} from "./dialogs-reducer";

export let store: StoreType = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, message: 'I like ice cream!', likesCount: 3},
                {id: 1, message: 'Hello world!', likesCount: 5},
                {id: 1, message: 'juice and cake', likesCount: 10},
            ],
            newPostText: 'this is new social network'
        },
        messagesPage: {
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
    },
    getState() {
        return this._state
    },
    _callSubscriber(state: StateType) {
        console.log('state changed!')
    },
    subscribe(observer: (state: StateType) => void) {
        this._callSubscriber = observer;
    },
    dispatch(action: ActionsType) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)

    /*    this._callSubscriber(this._state)*/
    }
}

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type DialogsDataType = {
    id: number
    name: string
}

export type messagesDataType = {
    id: number
    message: string
}

export type StateType = {
    profilePage: ProfilePageType
    messagesPage: MessagesPageType
}

export type ProfilePageType = {
    postData: Array<PostDataType>
    newPostText: string
}

export type MessagesPageType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<messagesDataType>
    newMessageBody: string
}

export type ActionsType = addPostACType | updateNewPostTextACType | updateNewMessageBodyACType | sendMessageACType

export type StoreType = {
    _state: StateType
    getState: () => StateType

    _callSubscriber: (state: StateType) => void
    subscribe: (observer: (state: StateType) => void) => void
    dispatch: (action: ActionsType) => void
}