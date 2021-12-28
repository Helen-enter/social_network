import React from "react";
import {sendMessageACType} from "./dialogs-reducer";
import {addPostACType} from "./profile-reducer";
import {Dispatch} from "redux";
import {setAuthUserDataACType, getAuthUserData} from "./auth-reducer";

export const INITIALISED_SUCCESS = 'INITIALISED_SUCCESS'

export type ActionsType = addPostACType | sendMessageACType | setAuthUserDataACType | initialisedSuccessACType

export let InitialState: InitialStateType = {
    initialised: false
}

export type InitialStateType = {
    initialised: boolean
}

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

export const initializeApp = () => (dispatch: Dispatch) => {
    let promise = dispatch(getAuthUserData());
    debugger
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });

}

export type initialisedSuccessACType = ReturnType<typeof initializedSuccess>