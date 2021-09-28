import React, {useState} from 'react';
import {IRouter, privateRouters, publicRouters, RouterNames} from "../router";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {StaticContext} from 'react-router';

const AppRouter = () => {
    const [auth, setAuth] = useState(false);
    return (
        auth ?
            <Switch>
                {privateRouters.map((route: IRouter) => (
                        <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>
                    )
                )}
                <Redirect to={RouterNames.HOME}/>
            </Switch>
            :
            <Switch>
                {publicRouters.map((route: IRouter) => (
                        <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>
                    )
                )}
                <Redirect to={RouterNames.HOME}/>
            </Switch>
    );
};

export default AppRouter;