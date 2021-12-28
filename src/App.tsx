import React, {Component} from 'react';
import s from './App.module.css'
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Login/Login';
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./common/Preloader/Preloader";
import {initializeApp} from './redux/app-reducer'

export type AppType = {
    initialiseApp: any
    initialised: boolean
}

class App extends Component<any> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        /*if (!this.props.initialized) {
            return <Preloader/>
        }*/
        return (
            <div className={s.appWrapper}>
                <HeaderContainer/>
                <Navbar/>
                <Route path={'/Dialogs'} render={() => <DialogsContainer/>}/>
                <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                <Route path={'/Users'} render={() => <UsersContainer/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </div>
        )
    }
}

/*class App extends Component<any> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>

                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>

                    <Route path='/users'
                           render={() => <UsersContainer/>}/>

                    <Route path='/login'
                           render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}*/

const mapStateToProps = (state: AppStateType) => ({
    initialised: state.app.initialised
})

export default compose<any>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);