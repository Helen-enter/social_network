import React from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <nav className={s.nav}>
                <div><NavLink to={'/Profile'} activeClassName={s.active}>profile</NavLink></div>
                <div><NavLink to={'/Users'} activeClassName={s.active}>users</NavLink></div>
                <div><NavLink to={'/Dialogs'} activeClassName={s.active}>messages</NavLink></div>
                <div><NavLink to={'/News'} activeClassName={s.active}>news</NavLink></div>
                <div><NavLink to={'/Music'} activeClassName={s.active}>music</NavLink></div>
                <div><NavLink to={'/Settings'} activeClassName={s.active}>settings</NavLink></div>
            </nav>
        </>
    )
}