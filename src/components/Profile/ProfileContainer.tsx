import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {StateType} from "../../redux/store";
import {setUserProfile} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);