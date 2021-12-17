import React from "react";
import s from "../Profile.module.css";
import image from "../../../assets/tmb.jpg";
import {ProfileType} from "../Profile";
import {Preloader} from "../../../common/Preloader/Preloader";

export const ProfileInfo = (props: ProfileType) => {
    const divContent = {
        backgroundImage: `url(${image})`,
    };
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={s.content}>
            <div className={s.mainContent} style={divContent}>
                Main content
            </div>
            <div>
                <img src={props.profile.photos.large}/>
                ava + description
            </div>
        </div>
    )
}