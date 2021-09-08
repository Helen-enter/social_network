import React from "react";
import {ActionsType} from "./store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

type LocationType = {
    country: string
    city: string
}

export type UserType = {
    id: number
    fullName: string
    status: string
    photoUrl: string
    followed: boolean
    location: LocationType
}

type InitialStateType = {
    users: Array<UserType>
}

export let initialState: InitialStateType = {users: []}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export const followAC = (userID: number): any => ({type: FOLLOW, userID})
export const unfollowAC = (userID: number): any => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: Array<UserType>): any => ({type: SET_USERS, users})

export default usersReducer;