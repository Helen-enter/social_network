import React from "react";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    unfollowAC,
    setUsersTotalCountAC,
    toggleIsFetchingAC
} from "../../redux/users-reducer";
import {Users, UsersDataType} from "./Users";
import axios from "axios";
import {Preloader} from "../../common/Preloader/Preloader";

export type UsersType = {
    users: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersStateType = {
    usersPage: UsersType
}

class UsersContainer extends React.Component<any, any> {

    componentDidMount() {

        this.props.toggleIsFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.toggleIsFetching(false)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.toggleIsFetching(false)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users} setUsers={this.props.setUsers}
                   totalUsersCount={this.props.totalUsersCount} setTotalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                   setCurrentPage={this.props.setCurrentPage} pageSize={this.props.pageSize}
                   follow={this.props.follow} unfollow={this.props.unfollow}/>
        </>
    }
}

let mapStateToProps = (state: UsersStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }

}

export default connect(mapStateToProps, {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setUsersTotalCountAC,
    toggleIsFetching: toggleIsFetchingAC
})
(UsersContainer)