import React from "react";
import styles from "./Users.module.css";
import photoCat from "../../assets/base_87716f252d.jpg";
import axios from "axios";

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
    setTotalUsersCount: (totalCount: number) =>  void
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
}

export class Users extends React.Component<UsersComponentType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map(p => {
                    return <span className={this.props.currentPage === p ? styles.selectedPage : ''}
                                 onClick={(e) => this.onPageChanged(p)}>{p}</span>
                })}
            </div>
            {this.props.users.map((u: UsersDataType) => <div key={u.id}>
                <span>
                    <div className={styles.photo}><img
                        src={u.photos.small != null ? u.photos.small : photoCat}/></div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
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
    }
}
