import React from "react";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props: any) => {

    if(!props.profile) {
        return <Preloader />
    }
debugger;
    return (
        <div>
            {/*<img src='https://images.wallpaperscraft.ru/image/tekstura_fon_tekst_simvoly_50473_1920x1080.jpg'/>*/}
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;