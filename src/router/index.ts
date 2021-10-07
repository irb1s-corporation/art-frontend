import React from "react";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

export interface IRouter {
    path: string
    component: React.ComponentType;
    exact?: boolean
}

export enum RouterNames {
    HOME = '/',
    PROFILE = '/profile',
}

export const publicRouters: IRouter[] = [
    {path: RouterNames.HOME, component: Home, exact: true}
]

export const privateRouters: IRouter[] = [
    {path: RouterNames.PROFILE, component: Profile, exact: false},
    {path: RouterNames.HOME, component: Home, exact: true},
]
