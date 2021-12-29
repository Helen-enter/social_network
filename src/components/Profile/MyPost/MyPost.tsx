import React from "react";
import {Post} from "./Post/Post";
import s from './MyPost.module.css'
import {PostDataType} from "../../../redux/store";
import {reduxForm, Field} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

type MyPostType = {
    postData: PostDataType[]
    addPost: (newPostText: string) => void
    newPostText: string
}

export class MyPost extends React.PureComponent<MyPostType> {

    shouldComponentUpdate(nextProps: Readonly<MyPostType>, nextState: Readonly<{}>, nextContext: any): boolean {
        return nextProps != this.props || nextState != this.state
    }

    render() {
        let postElements = this.props.postData.map((p) => <Post id={p.id} message={p.message}
                                                                likesCount={p.likesCount}/>)

        let onAddPost = (values: any) => {
            this.props.addPost(values.newPostText)
        }
        return (
            <div className={s.postsBlock}>
                <h3>My post</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                {postElements}
            </div>
        )
    }
}

const maxLength10 = maxLengthCreator(10)

export const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} validate={[requiredField, maxLength10]}/>
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)