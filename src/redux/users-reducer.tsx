import React from "react";
import {sendMessageACType} from "./dialogs-reducer";
import {addPostACType} from "./profile-reducer";
import {UsersDataType} from "../components/Users/Users";
import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

export type ActionsType =
    addPostACType
    | sendMessageACType
    | toggleIsFetchingACType
    | unfollowACType
    | followACType
    | setUsersACType
    | setCurrentPageACType
    | setUsersTotalCountACType
    | toggleIsFollowingProgressACType

let InitialState: InitialStateType = {
    users: [] as Array<UsersDataType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

export type InitialStateType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
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

        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: number) => id != action.userId)
            }
        }
        default:
            return state;
    }
}


export const followSuccess = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId
    } as const
}

export const setUsers = (users: UsersDataType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
} as const)

export const requestUsers= (currentPage: number, pageSize: number): ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPageAC(currentPage))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: Function, actionCreator: (userId: number) => ActionsType) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export type unfollowACType = ReturnType<typeof unfollowSuccess>
export type followACType = ReturnType<typeof followSuccess>
export type setUsersACType = ReturnType<typeof setUsers>
export type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type setUsersTotalCountACType = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetchingACType = ReturnType<typeof toggleIsFetching>
export type toggleIsFollowingProgressACType = ReturnType<typeof toggleIsFollowingProgress>