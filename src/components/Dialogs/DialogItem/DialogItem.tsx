import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type DialogsItemType = {
    name: string
    id: number
}

export const DialogItem = (props: DialogsItemType) => {
    return <div className={s.item}><NavLink to={`/Dialogs/${props.id}`}
                                            activeClassName={s.active}>{props.name}</NavLink></div>
}