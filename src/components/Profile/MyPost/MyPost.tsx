import React, {RefObject} from "react";
import {Post} from "./Post/Post";
import s from './MyPost.module.css'
import {ProfileType} from "../Profile";
import { updateNewPostTextAC, addPostAC } from "../../../redux/profile-reducer";

export const MyPost = (props: ProfileType) => {

    let postElements = props.state.postData.map((p) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)
    let newPostElement: RefObject<HTMLTextAreaElement> = React.createRef()

    let addPost = () => {
        props.dispatch(addPostAC())
    }

    let onPostChange = () => {
        if (newPostElement.current?.value) {
            let text = newPostElement.current.value
            props.dispatch(updateNewPostTextAC(text))
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div><textarea ref={newPostElement} onChange={onPostChange}></textarea></div>
                <div>
                    <button onClick={addPost}>add post</button>
                </div>
            </div>
            {postElements}
        </div>
    )
}