import React from 'react';
import s from './App.module.css'
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { Login } from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';

export const App = () => {
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