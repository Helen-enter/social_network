import React from "react";
import {Header, HeaderPropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {logout})(HeaderContainer)