import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Posts/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

type postsDataType = {
    id: number
    message: string
    likesCount: number
}

type AddPostActionType = {
    type: 'ADD-POST'
}

type UpdateNewPostTextType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

type ActionsType = AddPostActionType | UpdateNewPostTextType

type MyPostsPropsType = {
    posts: Array<postsDataType>
    //addPost: () => void
    newPostText: string
    //updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsType) => void
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map((el) => <Post message={el.message} likesCount={el.likesCount} id={el.id}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>();
    let addPost = () => {
        //props.addPost();
        props.dispatch(addPostActionCreator())
    }

    const onPostChange = () => {
        if(newPostElement.current?.value) {
        let text = newPostElement.current.value;
        //props.updateNewPostText(text);
           // let action = ({type: 'UPDATE-NEW-POST-TEXT', newText: text})
            props.dispatch(updateNewPostTextActionCreator(text));
        }
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    {/*{props.posts.map((p) => <div key={p.id}>{p.message}</div>)}*/}
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
                <div>
                    <button>Remove</button>
                </div>
            </div>
            <div>New posts</div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;