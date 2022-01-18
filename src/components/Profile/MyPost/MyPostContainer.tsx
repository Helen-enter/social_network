import React from "react";
import {addPostAC} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {StateType} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

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
