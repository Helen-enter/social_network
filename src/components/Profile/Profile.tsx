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

type ProfilePropsType = {
    profilePage: profilePageType
    addPostCallback: () => void
    updateNewPostText: (newText: string) => void
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.postsData}
                     addPost={props.addPostCallback}
                     newPostText={props.profilePage.newPostText}
                     updateNewPostText={props.updateNewPostText}/>
        </div>
    )
}

export default Profile;