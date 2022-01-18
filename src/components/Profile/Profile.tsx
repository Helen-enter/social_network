import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {ContactsType, ProfileType} from "../../redux/profile-reducer";

export type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    owner: boolean
    savePhoto: (files: File) => void
    fullName: string
    lookingForAJob: string
    aboutMe: string
    contacts: ContactsType
    saveProfile: (formData: ProfileType) => Promise<void>
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                         owner={props.owner} savePhoto={props.savePhoto} lookingForAJob={props.lookingForAJob}
                         aboutMe={props.aboutMe} contacts={props.contacts} fullName={props.fullName}
                         saveProfile={props.saveProfile}/>
            <MyPostContainer/>
        </div>
    )
}