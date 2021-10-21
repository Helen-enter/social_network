import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Posts/Post";
import {reduxForm} from "redux-form";
import {Field} from "redux-form";

type postsDataType = {
    id: number
    message: string
    likesCount: number
}

type MyPostsPropsType = {
    posts: Array<postsDataType>
    addPost: (newPostText: string) => void
    newPostText: string
}

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component='textarea'/>
            </div>
            <div>
                <button>Add post</button>
            </div>
            <div>
                <button>Remove</button>
            </div>
        </form>
    )
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map((el) => <Post message={el.message} likesCount={el.likesCount} id={el.id}/>)
    //let newPostElement = React.createRef<HTMLTextAreaElement>();
    let onAddPost = (values: any) => {
        props.addPost(values.newPostText);
    }


    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
           <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div>New posts</div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

let AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;