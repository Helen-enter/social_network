import React from "react";
import s from "./Header.module.css";
import Logo from "../../assets/chat_icon.jpg";
import {NavLink} from "react-router-dom";


export const Header = (props: any) => {
    return (
        <header className={s.header}>
            <img className={s.photo} src={Logo}/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>login</NavLink>}
            </div>
        </header>
    )
}