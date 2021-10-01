import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: any
    follow: (id: string | number | undefined) => void
    unfollow: (id: string | number | undefined) => void
    toggleIsFollowingProgress: any
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
            props.users.map((u: { id: string | number | undefined; photos: { small: string | null | undefined; }; followed: any; name: React.ReactNode; status: React.ReactNode; }) =>
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
                                          props.toggleIsFollowingProgress(true, u.id);
                                          // @ts-ignore
                                          axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                              withCredentials: true,
                                              headers: {
                                                  "API-KEY": '1d4411b3-b96b-4ab2-9d09-a99a5ed2b337'
                                              }
                                          })
                                              .then((response: any) => {
                                                  if (response.data.resultCode == 0) {
                                                      props.unfollow(u.id);
                                                  }
                                                  props.toggleIsFollowingProgress(false, u.id);
                                              });


                                      }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                      onClick={() => {
                                          props.toggleIsFollowingProgress(true, u.id);
                                          // @ts-ignore
                                          axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                              withCredentials: true,
                                              headers: {
                                                  "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
                                              }
                                          })
                                              .then((response: any) => {
                                                  if (response.data.resultCode == 0) {
                                                      props.follow(u.id);
                                                  }
                                                  props.toggleIsFollowingProgress(false, u.id);
                                              });


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