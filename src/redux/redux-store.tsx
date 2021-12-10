import React from "react";
import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";

let reducers = combineReducers({
    profileReducer,
    dialogsReducer
})

export type AppStateType = ReturnType<typeof reducers>

export let store = createStore(reducers)