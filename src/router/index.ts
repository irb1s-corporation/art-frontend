import React from "react";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateArt from "../pages/CreateArt";

export interface IRouter {
    path: string
    component: React.ComponentType;
    exact?: boolean
}

export enum RouterNames {
    HOME = '/',
    PROFILE = '/profile',
    CREATE_ART = '/create'
}

export const publicRouters: IRouter[] = [
    {path: RouterNames.HOME, component: Home, exact: true}
]

export const privateRouters: IRouter[] = [
    {path: RouterNames.PROFILE, component: Profile, exact: true},
    {path: RouterNames.HOME, component: Home, exact: true},
    {path: RouterNames.CREATE_ART, component: CreateArt, exact: true}
]
