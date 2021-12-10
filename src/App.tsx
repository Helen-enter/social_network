import React from 'react';
import s from './App.module.css'
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Route} from 'react-router-dom';
import {AppStateType} from "./redux/store";

export const App = (props: AppStateType) => {
    return (
        <div className={s.appWrapper}>
            <Header/>
            <Navbar/>
            <Route path={'/Dialogs'} render={() => <Dialogs store={props.store}/>}/>
            <Route path={'/Profile'} render={() => <Profile state={props.appState.profilePage}
                                                            dispatch={props.dispatch}/>}/>
        </div>
    )
}