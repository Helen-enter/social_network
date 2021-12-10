import React from "react";
import s from "./Header.module.css";
import Logo from "../../assets/chat_icon.jpg";


export const Header = () => {
    const divStyle = {
        backgroundImage: `url(${Logo})`,
    };
    return (
        <header className={s.header}>
            <div className={s.photo} style={divStyle}></div>
        </header>
    )
}