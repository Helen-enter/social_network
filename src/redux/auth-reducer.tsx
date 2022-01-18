import React from "react";
import {sendMessageACType} from "./dialogs-reducer";
import {addPostACType} from "./profile-reducer";
import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType} from "./redux-store";

export const SET_USER_DATA = 'network/auth/SET_USER_DATA'
export const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET_CAPTCHA_URL_SUCCESS'

export type ActionsType = addPostACType | sendMessageACType | setAuthUserDataACType | getCaptchaUrlSuccessACType

export let InitialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export type InitialStateType = {
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean
    captchaUrl: string | null
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const authReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                ...action.data
            }
        case GET_CAPTCHA_URL_SUCCESS :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            email,
            login,
            isAuth
        }
    } as const
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {
            captchaUrl
        }
    } as const
}

export const getAuthUserData = (): ThunkType => async (dispatch: Dispatch) => {
     let response = await authAPI.me()
        if (response.resultCode === 0) {
            let {id, login, email} = response.data
            dispatch(setAuthUserData(id, email, login, true))
        }
}

export const logout = (): ThunkType => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
}

export type setAuthUserDataACType = ReturnType<typeof setAuthUserData>
export type getCaptchaUrlSuccessACType = ReturnType<typeof getCaptchaUrlSuccess>