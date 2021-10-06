import {IRouter, privateRouters, publicRouters, RouterNames} from "../router";
import {Redirect, Route, Switch} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        isAuth ?
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