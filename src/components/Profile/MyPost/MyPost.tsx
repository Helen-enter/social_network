import React, {RefObject} from "react";
import {Post} from "./Post/Post";
import s from './MyPost.module.css'
import {PostDataType} from "../../../redux/store";

type MyPostType = {
    updateNewPostText: (text: string) => void
    postData: PostDataType[]
    addPost: () => void
    newPostText: string
}

export const MyPost = (props: MyPostType) => {

    let postElements = props.postData.map((p) => <Post id={p.id} message={p.message}
                                                    likesCount={p.likesCount}/>)
    let newPostElement: RefObject<HTMLTextAreaElement> = React.createRef()

    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = () => {
        if (newPostElement.current?.value) {
            let text = newPostElement.current.value
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div><textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}></textarea></div>
                <div>
                    <button onClick={onAddPost}>add post</button>
                </div>
            </div>
            {postElements}
        </div>
    )
}