import React from "react";
import s from "./Header.module.css";
import Logo from "../../assets/chat_icon.jpg";
import {NavLink} from "react-router-dom";

export type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => Promise<void>
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img className={s.photo} src={Logo}/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>log out</button></div>
                    : <NavLink to={'/login'}>login</NavLink>}
            </div>
        </header>
    )
}