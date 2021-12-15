import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";

export const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostContainer/>
        </div>
    )
}