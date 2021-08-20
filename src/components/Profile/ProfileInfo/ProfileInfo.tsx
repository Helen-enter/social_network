import MyPosts from "../MyPosts/MyPosts";
import React from "react";
import classes from "./ProfileInfo.module.css"

const ProfileInfo = () => {
    return (
        <div>
            <img src='https://images.wallpaperscraft.ru/image/tekstura_fon_tekst_simvoly_50473_1920x1080.jpg'/>
            <div className={classes.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;