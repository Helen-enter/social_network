import React from "react";
import {
    AddPostActionType, FollowUserType,
    SendMessageType, SetUsersType, UnFollowUserType,
    UpdateNewMessageBodyType,
    UpdateNewPostTextType
} from "./store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

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
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    profile: any
    followingInProgress: any
}

export type SetCurrentPageType = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}

type SetTotalUsersCountType = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalUsersCount: any
}

type ToggleIsFetchingType = {
    type: 'TOGGLE-IS-FETCHING',
    isFetching: boolean
}

type SetUserProfileType = {
    type: 'SET-USER-PROFILE',
    profile: any
}

type ToggleIsFollowingProgressType = {
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
    isFetching: boolean
    userId: number
}

export type ActionsType =
    AddPostActionType |
    UpdateNewPostTextType |
    UpdateNewMessageBodyType |
    SendMessageType |
    FollowUserType |
    UnFollowUserType |
    SetUsersType |
    SetCurrentPageType |
    SetTotalUsersCountType |
    ToggleIsFetchingType |
    SetUserProfileType |
    ToggleIsFollowingProgressType

export let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    profile: null,
    followingInProgress: []
}

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
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter((id: number) => id != action.userId)]}
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        default:
            return state;
    }
}

export const follow = (userID: number): any => ({type: FOLLOW, userID})
export const unfollow = (userID: number): any => ({type: UNFOLLOW, userID})
export const setUsers = (users: Array<UserType>): any => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): any => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: any): any => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching: boolean): any => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): any => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})
export const setUserProfile = (profile: any): any => ({type: SET_USER_PROFILE, profile})

export default usersReducer;