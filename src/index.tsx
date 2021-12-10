import * as serviceWorker from './serviceWorker';
import './index.css'
import React from "react";
import {StateType, store} from './redux/store';
import ReactDOM from "react-dom";
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";

let rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(<BrowserRouter>
        <App appState={store.getState()}
             dispatch={store.dispatch.bind(store)}
             store={store}
        />
    </BrowserRouter>, document.getElementById('root'));
}

rerenderEntireTree(store.getState())
store.subscribe(rerenderEntireTree)

// API
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();