import React from "react";
import {ActionsType, AddPostActionType, postsDataType, UpdateNewPostTextType} from "./store";
import {usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

type InitialStateType = {
    postsData: Array<postsDataType>
    newPostText: string
}

let initialState: InitialStateType = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Hey', likesCount: 4}
    ],
    newPostText: 'Yo!'
}

const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST : {
            let newPost: postsDataType = {
                id: 10,
                message: state.newPostText,
                likesCount: 0
            }
            return  {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT : {
            return  {
                ...state,
                newPostText: action.newText
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

export default profileReducer;