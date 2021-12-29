import React from "react";
import styles from "./Users.module.css";
import photoCat from "../../assets/base_87716f252d.jpg";
import {NavLink} from "react-router-dom";
import {Paginator} from "./Paginator";

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
    return (
        <div>
            <Paginator pageSize={props.pageSize} totalUsersCount={props.totalUsersCount} currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}/>
            {props.users.map((u: UsersDataType) => <div key={u.id}>
                <span>
                    <div className={styles.photo}>
                        <NavLink to={`/Profile/${u.id}`}><img src={u.photos.small != null ? u.photos.small : photoCat}/></NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                      onClick={() => {
                                          props.unfollow(u.id)
                                      }}>unfollow</button>
                            : <button disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                      onClick={() => {
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