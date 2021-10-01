import React from "react";
import c from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props: any) => {
    return (
        <div>
            <header className={c.header}>
                <img src='https://img.freepik.com/free-psd/logo-mockup_35913-2089.jpg?size=626&ext=jpg'/>
                <div className={c.loginBlock}>
                    {props.isAuth
                        ? props.login
                        : <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </header>
        </div>
    )
}

export default Header;