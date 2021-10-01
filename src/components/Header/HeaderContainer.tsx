import React from "react";
import Header from "./Header";
import * as axios from "axios";
import { connect } from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<any, any>{
    componentDidMount() {
        //@ts-ignore
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then((response: any) => {
                if(response.data.resultCode === 0) {
                    let {userId, email, login} = response.data.data;
                    this.props.setAuthUserData(userId, email, login)
                }
            })
    }
    render() {
        // @ts-ignore
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);