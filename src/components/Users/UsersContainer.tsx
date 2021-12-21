import React from "react";
import {connect} from "react-redux";
import {
    followSuccess,
    setCurrentPageAC,
    toggleIsFollowingProgress, unfollowSuccess
} from "../../redux/users-reducer";
import {Users, UsersDataType} from "./Users";
import {Preloader} from "../../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {getUsers} from "../../redux/users-reducer";

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
        this.props.getUsers(this.props.currentPage, this.props.pageSize)

        /*this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
            this.props.setTotalUsersCount(data.totalCount)
            this.props.toggleIsFetching(false)
        })*/
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)

        /*this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
            this.props.toggleIsFetching(false)
        })*/
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users} setUsers={this.props.setUsers}
                   totalUsersCount={this.props.totalUsersCount} setTotalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                   setCurrentPage={this.props.setCurrentPage} pageSize={this.props.pageSize}
                   follow={this.props.follow} unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }

}

export default connect(mapStateToProps, {
    follow: followSuccess,
    unfollow: unfollowSuccess,
    setCurrentPage: setCurrentPageAC,
    toggleIsFollowingProgress, getUsers
})
(UsersContainer)