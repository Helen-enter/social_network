import React from "react";
import styles from "./Users.module.css"
import { UsersPropsType } from "./UsersContainer";
import  axios from 'axios'
import userPhoto from '../../../src/assets/images/user.png'

class Users extends React.Component<any, any> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items);
        })
    }

    render() {
        return <div>
            {
                this.props.users.map((u: { id: string | number | undefined; photos: { small: string | null | undefined; }; followed: any; name: React.ReactNode; status: React.ReactNode; }) => <div key={u.id}>
                        <span>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto } className={styles.userPhoto}/>
                        </span>
                    <span>
                            {u.followed
                                ? <button onClick={() => {this.props.unfollow(u.id)}}>Unfollow</button>
                                : <button onClick={() => {this.props.follow(u.id)}}>Follow</button>}
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
                </div>)
            }
        </div>
    }
}

export default Users;