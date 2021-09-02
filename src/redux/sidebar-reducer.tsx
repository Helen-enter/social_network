import React from "react";
import {ActionsType} from "./store";

let initialState = {
    sidebar: {}
}

const sidebarReducer =  (state = initialState, action: ActionsType) => {
    return state;
}

export default sidebarReducer;