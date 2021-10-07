import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {getUserProfile} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {

        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {

        // @ts-ignore
        if (!props.isAuth) return <Redirect to={'/Login'}/>

        return (
            <Profile {...this.props} profile ={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent =  withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);