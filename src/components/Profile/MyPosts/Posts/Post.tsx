import React from "react";
import s from './Post.module.css'

// type PostType = {
//     message: string
//     likesCount: number
//     id: number
// }

const Post /*React.FC<PostType>*/ = (props: any) => {
    return (
        <div className={s.item}>
            <img src='https://goodhands.vet/upload/iblock/555/555e6ed7d3b4f48330cc2789309c06f6.jpg'/>
            {props.message}
            <div>
                <span>like</span>{props.likesCount}
            </div>
        </div>
    )
}

export default Post;