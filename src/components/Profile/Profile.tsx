import React from "react";
import {MyPost} from "./MyPost/MyPost";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType, ActionsType} from "../../redux/store";

export type ProfileType = {
    state: ProfilePageType
    dispatch: (action: ActionsType) => void
}

export const Profile = (props: ProfileType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPost state={props.state} dispatch={props.dispatch}/>
        </div>
    )
}