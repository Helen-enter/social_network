import React from "react";
import {PostDataType} from "./store";
import {sendMessageACType, updateNewMessageBodyACType} from "./dialogs-reducer";
import {UsersDataType} from "../components/Users/Users";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

export type addPostACType = ReturnType<typeof addPostAC>
export type updateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>
export type setUserProfileType = ReturnType<typeof setUserProfile>

export type ActionsType =
    addPostACType
    | updateNewPostTextACType
    | updateNewMessageBodyACType
    | sendMessageACType
    | setUserProfileType

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

export const setUserProfile = (profile: UsersDataType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

let InitialState: InitialStateType = {
    postData: [
        {id: 1, message: 'I like ice cream!', likesCount: 3},
        {id: 1, message: 'Hello world!', likesCount: 5},
        {id: 1, message: 'juice and cake', likesCount: 10},
    ],
    newPostText: 'this is new social network',
    profile: null
}

export type InitialStateType = {
    postData: PostDataType[]
    newPostText: string
    profile: null
}

export const profileReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost = {id: 5, message: state.newPostText, likesCount: 0}
            return {
                ...state,
                postData: [newPost, ...state.postData],
                newPostText: ''
            }
        }
        case "UPDATE-NEW-POST-TEXT": {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case "SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}