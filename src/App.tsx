import React from 'react';
import s from './App.module.css'
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route} from 'react-router-dom';
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import { UsersContainer } from './components/Users/UsersContainer';

export const App = () => {
    return (
        <div className={s.appWrapper}>
            <Header/>
            <Navbar/>
            <Route path={'/Dialogs'} render={() => <DialogsContainer/>}/>
            <Route path={'/Profile'} render={() => <Profile/>}/>
            <Route path={'/Users'} render={() => <UsersContainer/>}/>
        </div>
    )
}