import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Posts/Post";

type postsDataType = {
    id: number
    message: string
    likesCount: number
}

type MyPostsPropsType = {
    posts: Array<postsDataType>
    addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map((el) => <Post message={el.message} likesCount={el.likesCount} id={el.id}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>();
    let onAddPost = () => {
        props.addPost();
    }

    const onPostChange = () => {
        if(newPostElement.current?.value) {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
        }
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
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