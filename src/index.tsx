import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import './index.css'
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {stateType} from './redux/store'
import React from "react";
import store from "./redux/redux-store";
import {Provider} from "./StoreContext";


export let rerenderEntireTree = (state: stateType) => {

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App
                />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    )
    ;
}

rerenderEntireTree(store.getState());
store.subscribe(() => {
    rerenderEntireTree(/*state*/store.getState())
})
// API
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();