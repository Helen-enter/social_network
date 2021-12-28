import React from "react";
import {addPostAC} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {StateType} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

/*type MyPostContainerType = {
    store: StoreType
}

export const MyPostContainer = (props: MyPostContainerType) => {
    let state = props.store.getState()

    let addPost = () => {
        props.store.dispatch(addPostAC())
    }

    let onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextAC(text))
    }

    return (<MyPost updateNewPostText={onPostChange} posts={state.profilePage} addPost={addPost}/>)
}*/

let mapStateToProps = (state: StateType) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => dispatch(addPostAC(newPostText))
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)
