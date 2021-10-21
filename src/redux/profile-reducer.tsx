import React from "react";
import {ActionsType, AddPostActionType, postsDataType, UpdateNewPostTextType} from "./store";
import {profileAPI, usersAPI} from "../api/api";
import {setUserProfile} from "./users-reducer";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_STATUS = 'SET-STATUS'

type InitialStateType = {
    postsData: Array<postsDataType>
    newPostText: string
    profile: null
    status: string
}

let initialState: InitialStateType = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Hey', likesCount: 4}
    ],
    newPostText: 'Yo!',
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST : {
            let newPost: postsDataType = {
                id: 10,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT : {
            return {
                ...state,
                newPostText: action.newText
            }
        }
            ;
        case SET_STATUS : {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (): AddPostActionType => ({type: ADD_POST})
export const getUserProfile = (userId: number) => (dispatch: any) => {
    usersAPI.getProfile(userId).then(response => {
        // @ts-ignore
        dispatch(setUserProfile(response.data.items));
    })
}
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextType =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})
export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
}
export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}
export const setStatus = (status: string) => ({type: SET_STATUS, status})

export default profileReducer;