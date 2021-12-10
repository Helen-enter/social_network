import React from "react";
import {StateType} from "./store";
import {sendMessageACType, updateNewMessageBodyACType} from "./dialogs-reducer";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export type addPostACType = ReturnType<typeof addPostAC>
export type updateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

export type ActionsType = addPostACType | updateNewPostTextACType | updateNewMessageBodyACType | sendMessageACType

export const addPostAC = () => {
    return {
        type: ADD_POST
    } as const
}
export const updateNewPostTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}

let InitialState = {
    postData: [
        {id: 1, message: 'I like ice cream!', likesCount: 3},
        {id: 1, message: 'Hello world!', likesCount: 5},
        {id: 1, message: 'juice and cake', likesCount: 10},
    ],
    newPostText: 'this is new social network'
}

export const profileReducer = (state= InitialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost = {id: 5, message: state.newPostText, likesCount: 0}
            state.postData.push(newPost)
            state.newPostText = ''
            return state
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText
            return state
        default:
            return state;
    }
}