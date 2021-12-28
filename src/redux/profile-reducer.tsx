import React from "react";
import {PostDataType} from "./store";
import {sendMessageACType} from "./dialogs-reducer";
import {UsersDataType} from "../components/Users/Users";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

export type addPostACType = ReturnType<typeof addPostAC>
export type setUserProfileType = ReturnType<typeof setUserProfile>
export type setStatusACType = ReturnType<typeof setStatus>

export type ActionsType =
    addPostACType
    | sendMessageACType
    | setUserProfileType
    | setStatusACType

export const addPostAC = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText
    } as const
}

export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}

export const setUserProfile = (profile: UsersDataType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const getUserProfile = (userId: number) => {
    return (dispatch: Dispatch) => {
        usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })
    }
}

export const getStatus = (userId: number) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data))
        })
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}

let InitialState: InitialStateType = {
    postData: [
        {id: 1, message: 'I like ice cream!', likesCount: 3},
        {id: 1, message: 'Hello world!', likesCount: 5},
        {id: 1, message: 'juice and cake', likesCount: 10},
    ],
    newPostText: 'this is new social network',
    profile: null,
    status: ''
}

export type InitialStateType = {
    postData: PostDataType[]
    newPostText: string
    profile: null | UsersDataType
    status: string
}

export const profileReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost = {id: 5, message: action.newPostText, likesCount: 0}
            return {
                ...state,
                postData: [newPost, ...state.postData],
                newPostText: ''
            }
        }
        case "SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}