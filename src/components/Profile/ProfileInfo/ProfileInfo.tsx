import React, {useState, ChangeEvent} from "react";
import s from "../Profile.module.css";
import image from "../../../assets/tmb.jpg";
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import photo from '../../../assets/base_87716f252d.jpg'
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../redux/profile-reducer";

export type ProfileInfoType = {
    profile: ProfileType | null
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

export const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    const [editMode, setEditMode] = useState(false)

    const divContent = {
        backgroundImage: `url(${image})`,
    };
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div className={s.content}>
            <div className={s.mainContent} style={divContent}>
                Main content
            </div>
            <div>
                <img className={s.avatar} src={props.profile.photos.large || photo}/>
                {props.owner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                ava + description
                {editMode
                    ? <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile}
                                                onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.owner}
                                   goToEditMode={() => setEditMode(true)}/>
                }
            </div>
        </div>
    )
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>
    </div>
}

type ContactPropsType = {
    contactTitle: string, contactValue: string
}

const Contact = (props: ContactPropsType) => {
    return <div className={s.contact}><b>{props.contactTitle}</b>: {props.contactValue}</div>
}