import firebase from "firebase/app";
import React from "react"
import {BrowserRouter} from "react-router-dom"
import Routes from "./Components/Routes"

let config = {
    databaseURL: process.env.REACT_APP_DB_URL,
};
firebase.initializeApp(config)

export default () => {
    return <BrowserRouter>
        <Routes/>
    </BrowserRouter>
}
