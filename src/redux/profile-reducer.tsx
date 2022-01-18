import React from "react";
import {PostDataType} from "./store";
import {sendMessageACType} from "./dialogs-reducer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {BaseThunkType} from "./redux-store";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO = 'SAVE_PHOTO'

type ThunkType = BaseThunkType<ActionsType>

export type addPostACType = ReturnType<typeof addPostAC>
export type setUserProfileType = ReturnType<typeof setUserProfile>
export type setStatusACType = ReturnType<typeof setStatus>
export type deletePostType = ReturnType<typeof deletePost>
export type savePhotoSuccessType = ReturnType<typeof savePhotoSuccess>

export type ActionsType =
    addPostACType
    | sendMessageACType
    | setUserProfileType
    | setStatusACType
    | deletePostType
    | savePhotoSuccessType

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

export const setUserProfile = (profile: null | ProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const deletePost = (id: number) => {
    return {
        type: DELETE_POST,
        id
    } as const
}

export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: SAVE_PHOTO,
        photos
    } as const
}

export const getUserProfile: any = (userId: number) => {
    return async (dispatch: Dispatch) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch: Dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        try {
            profileAPI.updateStatus(status).then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
        } catch (error) {

        }
    }
}

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export const saveProfile = (profile: null | ProfileType): ThunkType => {
    return async (dispatch: Dispatch, getState) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
    }
}

let InitialState: InitialStateType = {
    postData: [
        {id: 1, message: 'I like ice cream!', likesCount: 3},
        {id: 2, message: 'Hello world!', likesCount: 5},
        {id: 3, message: 'juice and cake', likesCount: 10},
    ],
    newPostText: 'this is new social network',
    profile: null,
    status: ''
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type InitialStateType = {
    postData: PostDataType[]
    newPostText: string
    profile: ProfileType | null | {photos: PhotosType}
    status: string
}

export const profileReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost = {id: 4, message: action.newPostText, likesCount: 0}
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
        case "DELETE_POST": {
            return {
                ...state, postData: state.postData.filter(p => p.id != action.id)
            }
        }
        case "SAVE_PHOTO": {
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
}