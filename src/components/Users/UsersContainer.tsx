import React from "react";
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setCurrentPageAC,
    toggleIsFollowingProgress, unfollow,
} from "../../redux/users-reducer";
import {Users, UsersDataType} from "./Users";
import {Preloader} from "../../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {getPageSize} from "../../redux/users-selectors";

type UsersContainerPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UsersDataType>
    setUsers: () => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    setCurrentPage: () => void
    followingInProgress: Array<number>
    portionSize: 10
}

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users} setUsers={this.props.setUsers}
                   totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                   setCurrentPage={this.props.setCurrentPage} pageSize={this.props.pageSize}
                   follow={this.props.follow} unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
                   totalItemsCount={this.props.totalUsersCount}
                   portionSize={this.props.portionSize}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps, {
    follow, unfollow, setCurrentPageAC, toggleIsFollowingProgress, requestUsers
})
(UsersContainer)