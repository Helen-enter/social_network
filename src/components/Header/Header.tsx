import React from "react";
import c from './Header.module.css'

const Header = () => {
    return (
        <div>
            <header className={c.header}>
                <img src='https://img.freepik.com/free-psd/logo-mockup_35913-2089.jpg?size=626&ext=jpg'/>
            </header>
        </div>
    )
}

export default Header;