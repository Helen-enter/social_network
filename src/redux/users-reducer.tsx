import React from "react";
import {sendMessageACType, updateNewMessageBodyACType} from "./dialogs-reducer";
import {addPostACType, updateNewPostTextACType} from "./profile-reducer";
import {UsersDataType} from "../components/Users/Users";

export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

export type ActionsType = addPostACType | updateNewPostTextACType
    | updateNewMessageBodyACType | sendMessageACType | toggleIsFetchingACType
    | unfollowACType | followACType | setUsersACType | setCurrentPageACType | setUsersTotalCountACType

let InitialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export type InitialStateType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export const usersReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.count}
        }

        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}


export const followAC = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}
export const unfollowAC = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId
    } as const
}

export const setUsersAC = (users: UsersDataType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const setUsersTotalCountAC = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
} as const)


export type unfollowACType = ReturnType<typeof unfollowAC>
export type followACType = ReturnType<typeof followAC>
export type setUsersACType = ReturnType<typeof setUsersAC>
export type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type setUsersTotalCountACType = ReturnType<typeof setUsersTotalCountAC>
export type toggleIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>