import React from "react";
import {sendMessageACType, updateNewMessageBodyACType} from "./dialogs-reducer";
import {addPostACType, updateNewPostTextACType} from "./profile-reducer";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";

export const SET_USER_DATA = 'SET_USER_DATA'

export type ActionsType = addPostACType | updateNewPostTextACType
    | updateNewMessageBodyACType | sendMessageACType | setAuthUserDataACType

export let InitialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialStateType = {
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean
}

export const authReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            email,
            login
        }
    } as const
}

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, email, login))
        }
    })
}

export type setAuthUserDataACType = ReturnType<typeof setAuthUserData>