import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type postsDataType = {
    id: number
    message: string
    likesCount: number
}

type profilePageType = {
    postsData: Array<postsDataType>
    newPostText: string
}

type AddPostActionType = {
    type: 'ADD-POST'
}

type UpdateNewPostTextType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}
type ActionsType = AddPostActionType | UpdateNewPostTextType

type ProfilePropsType = {
    profilePage: profilePageType
    //addPostCallback: () => void
   // updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsType) => void
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.postsData}
                     dispatch={props.dispatch}
                     newPostText={props.profilePage.newPostText}/>
        </div>
    )
}

export default Profile;