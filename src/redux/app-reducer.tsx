import React from "react";
import {ActionsType, getAuthUserData} from "./auth-reducer";
import {BaseThunkType} from "./redux-store";
import {FormAction} from "redux-form";

export const INITIALISED_SUCCESS = 'INITIALISED_SUCCESS'

export let InitialState: InitialStateType = {
    initialised: false
}

export type InitialStateType = {
    initialised: boolean
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const appReducer = (state = InitialState, action: initialisedSuccessACType) => {
    switch (action.type) {
        case INITIALISED_SUCCESS :
            return {
                ...state,
                initialised: true
            }
        default:
            return state;
    }
}


export const initializedSuccess = () => {
    return {
        type: INITIALISED_SUCCESS
    } as const
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    await Promise.all([promise])
    dispatch(initializedSuccess());
}

export type initialisedSuccessACType = ReturnType<typeof initializedSuccess>