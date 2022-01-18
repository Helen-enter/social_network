import React, {Component, Suspense} from 'react';
import s from './App.module.css'
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "./redux/redux-store";
import {initializeApp} from './redux/app-reducer'
import { Preloader } from './common/Preloader/Preloader';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

export type AppType = {
    initializeApp: ()=> void
    initialized: boolean
    setUsers: () => void
    portionSize: 10
    setCurrentPage: () => void
}

class App extends Component<AppType> {
    catchAllUnhandledError = (PromiseRejectionEvent: Event) => {
        console.log('error')
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledError)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledError)
    }

    render() {
          // if (!this.props.initialized) {
          //      return <Preloader/>
          //  }
        return (
            <div className={s.appWrapper}>
                <HeaderContainer/>
                <Navbar/>
                <Route path={'/Dialogs'} render={() => {
                    return <Suspense fallback={<div>loading..</div>}><DialogsContainer/></Suspense>
                }}/>
                <Route path={'/Profile/:userId?'} render={() => {
                    return <Suspense fallback={<div>loading..</div>}><ProfileContainer/></Suspense>
                }}/>
                <Route path={'/Users'} render={() => <UsersContainer setUsers={this.props.setUsers}
                                                                     portionSize={this.props.portionSize}
                                                                     setCurrentPage={this.props.setCurrentPage}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialised: state.app.initialised
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);