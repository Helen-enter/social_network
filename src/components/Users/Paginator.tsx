import React from "react";
import styles from "./Users.module.css";

export type PaginatorType = {
    pageSize: number
    totalUsersCount: any
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


export let Paginator = (props: PaginatorType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ''}
                                 onClick={(e) => props.onPageChanged(p)}>{p}</span>
                })}
            </div>
        </div>
    )
}