import React from "react";
import {ActionsType, postsDataType} from "./store";
import {profileAPI, usersAPI} from "../api/api";
//import {setUserProfile} from "./users-reducer";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET-STATUS'

type InitialStateType = {
    postsData: Array<postsDataType>
    newPostText: string
    status: string
    profile: string
}

let initialState: InitialStateType = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Hey', likesCount: 4}
    ],
    newPostText: 'Yo!',
    profile: '',
    status: ''
}

const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST : {
            let newPost: postsDataType = {
                id: 10,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS : {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        };
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string): { newPostText: string; type: string } => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: string) => ({type: SET_USER_PROFILE, profile})
export const getUserProfile = (userId: number) => (dispatch: any) => {
    usersAPI.getProfile(userId).then(response => {
        // @ts-ignore
        dispatch(setUserProfile(response.data.items));
    })
}
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