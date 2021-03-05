import {observer} from "mobx-react-lite";
import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Auth from "./Auth";
import Contacts from "./Contacts/Contacts";
import auth from '../store/Auth'

const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                {auth.isAuth ? <Contacts
                    source={'common'}
                    label={'General list of contacts'}
                    link={{to: '/contacts', label: 'Elected contacts', theme: 'secondary'}}
                /> : <Auth/>}
            </Route>

            {auth.isAuth ? <Route path={'/contacts'}>
                <Contacts
                    source={'elected'}
                    label={'Elected contacts'}
                    link={{to: '/', label: 'Main page', theme: 'primary'}}
                />
            </Route> : <Redirect to="/" />}

        </Switch>
    )
}

export default observer(Routes)