import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/users-reducer";
import { withRouter } from "react-router-dom";

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {

        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2` + userId).then(response => {
            this.props.setUserProfile(response.data.items);
        })
    }

    render() {
        return (
            <Profile {...this.props} /*props = {this.props}*/ profile ={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent =  withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);