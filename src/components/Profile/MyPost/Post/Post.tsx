import React from "react";
import s from "./Post.module.css";
import image from "../../../../assets/cat.jpg";
import {PostDataType} from "../../../../redux/store";

export const Post = (props: PostDataType) => {
    const divContent = {
        backgroundImage: `url(${image})`,
    };
    return (
        <div className={s.postBlock}>
            New post
            <div className={s.photo} style={divContent}></div>
            <div>{props.message}</div>
            <div>like {props.likesCount}</div>
        </div>
    )
}