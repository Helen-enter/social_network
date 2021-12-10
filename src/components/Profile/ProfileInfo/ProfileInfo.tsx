import React from "react";
import s from "../Profile.module.css";
import image from "../../../assets/tmb.jpg";

export const ProfileInfo = () => {
    const divContent = {
        backgroundImage: `url(${image})`,
    };
    return (
        <div className={s.content}>
            <div className={s.mainContent} style={divContent}>
                Main content
            </div>
            <div>ava + description</div>
        </div>
    )
}