import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export type WithAuthRedirectType = {
    isAuth: boolean
}

export const withAuthRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<WithAuthRedirectType> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/Login'/>

            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;

}