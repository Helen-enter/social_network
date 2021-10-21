import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

function App() {

    // @ts-ignore
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>

                <Route path='/dialogs'
                    // @ts-ignore
                       render={() => <DialogsContainer/>}/>
                <Route path='/profile/:user.Id?'
                    // @ts-ignore
                       render={() => <ProfileContainer/>}/>
                <Route path='/users' render={() => <UsersContainer />}/>
                <Route path='/login' render={() => <Login />}/>
            </div>
        </div>
    )
}

export default App;