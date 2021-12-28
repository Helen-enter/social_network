import React from "react";
import styles from "./Users.module.css";
import photoCat from "../../assets/base_87716f252d.jpg";
import { NavLink } from "react-router-dom";

export type UsersDataType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: {
        small: string | undefined
        large: string | undefined
    },
    status: null | string
    followed: boolean
}


export type UsersComponentType = {
    setUsers: (users: UsersDataType[]) => void
    users: UsersDataType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUsersCount: any
    setTotalUsersCount: (totalCount: number) => void
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: []
}


export let Users = (props: UsersComponentType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ''}
                                 onClick={(e) => props.onPageChanged(p)}>{p}</span>
                })}
            </div>
            {props.users.map((u: UsersDataType) => <div key={u.id}>
                <span>
                    <div className={styles.photo}>
                        <NavLink to={`/Profile/${u.id}`}><img src={u.photos.small != null ? u.photos.small : photoCat}/></NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some((id: number) => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>unfollow</button>
                            : <button disabled={props.followingInProgress.some((id: number) => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}> follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{/*{u.location.country}*/}</div>
                        <div>{/*{u.location.city}*/}</div>
                    </span>
                </span>
            </div>)}
        </div>
    )
}