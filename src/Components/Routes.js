import React from 'react';
import {Switch, Route} from "react-router-dom";
import Auth from "./Auth";
import Contacts from "./Contacts/Contacts";

const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                {1 ? <Contacts source={'common'} label={'General list of contacts'} link={{to: '/contacts', label: 'Elected contacts', theme: 'secondary'}}/> : <Auth/>}
            </Route>

            <Route path={'/contacts'}>
                <Contacts source={'elected'} label={'Elected contacts'} link={{to: '/', label: 'Main page', theme: 'primary'}}/>
            </Route>
        </Switch>
    );
};

export default Routes