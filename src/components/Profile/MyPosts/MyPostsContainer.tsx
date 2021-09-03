import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {StoreType} from "../../../redux/store";

type MyPostsContainerPropsType = {
    store: StoreType
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {
    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const onPostChange = (text: string) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action)
    }
    return (
        <>
            <MyPosts
                updateNewPostText={onPostChange}
                addPost={addPost}
                posts={state.profilePage.postsData}
                newPostText={state.profilePage.newPostText}
                dispatch={props.store.dispatch}
            />
        </>
    )
}



export default MyPostsContainer;