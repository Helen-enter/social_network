import React from 'react';
import s from './App.module.css'
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from 'react-router-dom';
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

export const App = () => {
    return (
        <div className={s.appWrapper}>
            <Header/>
            <Navbar/>
            <Route path={'/Dialogs'} render={() => <DialogsContainer/>}/>
            <Route path={'/Profile/:userId'} render={() => <ProfileContainer/>}/>
            <Route path={'/Users'} render={() => <UsersContainer/>}/>
        </div>
    )
}