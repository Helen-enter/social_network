import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";

export type ProfileType = {
    profile: any
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostContainer/>
        </div>
    )
}