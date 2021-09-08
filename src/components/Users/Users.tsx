import React from "react";
import styles from "./Users.module.css"
import { UsersPropsType } from "./UsersContainer";

let Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
                {
                    id: 1,
                    photoUrl: 'https://www.m24.ru/b/d/nBkSUhL2gVMkn8-0PqzJrMCqzJ3w-pui1inGh_fH_nKUPXuaDyXTjHou4MVO6BCVoZKf9GqVe5Q_CPawk214LyWK9G1N5ho=YjarIArX-kmJrnA2Iq2RGg.jpg',
                    followed: false,
                    fullName: 'Svetlana',
                    status: 'I do it!',
                    location: {country: 'Belarus', city: 'Minsk'}
                },
                {
                    id: 2,
                    photoUrl: 'https://www.m24.ru/b/d/nBkSUhL2gVMkn8-0PqzJrMCqzJ3w-pui1inGh_fH_nKUPXuaDyXTjHou4MVO6BCVoZKf9GqVe5Q_CPawk214LyWK9G1N5ho=YjarIArX-kmJrnA2Iq2RGg.jpg',
                    followed: true,
                    fullName: 'Ekaterina',
                    status: 'I do it!',
                    location: {country: 'Russia', city: 'Moscow'}
                },
                {
                    id: 3,
                    photoUrl: 'https://www.m24.ru/b/d/nBkSUhL2gVMkn8-0PqzJrMCqzJ3w-pui1inGh_fH_nKUPXuaDyXTjHou4MVO6BCVoZKf9GqVe5Q_CPawk214LyWK9G1N5ho=YjarIArX-kmJrnA2Iq2RGg.jpg',
                    followed: false,
                    fullName: 'Egor',
                    status: 'I do it!',
                    location: {country: 'Ukraine', city: 'Kiev'}
                },
            ]
        )
    }


    return <div>
            {
                props.users.map(u => <div key={u.id}>
                        <span>
                            <img src={u.photoUrl} className={styles.userPhoto}/>
                        </span>
                        <span>
                            {u.followed
                                ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                                : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                        </span>
                        <span>
                            <span>
                            <div>{u.fullName}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                        </span>
                    </div>)
            }
        </div>
}

export default Users;