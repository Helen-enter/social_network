import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: any
    follow: (id: string | number | undefined) => void
    unfollow: (id: string | number | undefined) => void
    followingInProgress: any
}

let Users = (props: UsersType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                // @ts-ignore
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(p);
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map((u: { id: number; photos: { small: string }; followed: any; name: React.ReactNode; status: React.ReactNode; }) =>
                <div key={u.id}>
                <span>
                    <div>
                       <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                      onClick={() => {
                                          props.unfollow(u.id);
                                      }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                      onClick={() => {
                                          props.follow(u.id);
                                      }}>Follow</button>}

                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)
        }
    </div>;
}


export default Users;