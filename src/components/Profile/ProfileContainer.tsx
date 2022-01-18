import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {ContactsType, getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getStatus, updateStatus} from "../../redux/profile-reducer";
import {savePhoto} from "../../redux/profile-reducer";
import {saveProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";

type ProfileContainerPropsType = {
    authorisedUserId: number
    history: Array<string>
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    profile: ProfileType
    status: string
    updateStatus: () => void
    lookingForAJob: string
    contacts: ContactsType
    saveProfile: (formData: ProfileType) => Promise<void>
    savePhoto: () => void
    fullName: string
    aboutMe: string
    match: {
        params: {
            userId: number
        }
    }
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorisedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<any>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus} owner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto} fullName={this.props.fullName} contacts={this.props.contacts}
                     aboutMe={this.props.aboutMe} lookingForAJob={this.props.lookingForAJob}
                     saveProfile={this.props.saveProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    state: state.profilePage.status,
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer)
