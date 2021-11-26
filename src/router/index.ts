import React from "react";
import Home from "../pages/Home";
import Profile from "../pages/Profile/Profile";
import CreateArt from "../pages/CreateArt";
import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";
import Search from "../pages/Search";

export interface IRouter {
    path: string
    component: React.ComponentType;
    exact?: boolean
}

export enum RouterNames {
    HOME = '/',
    PROFILE = '/profile',
    CREATE_ART = '/create',
    CART = '/cart',
    FAVORITE = '/favorites',
    SEARCH = '/search/:content'
}

export const publicRouters: IRouter[] = [
    {path: RouterNames.HOME, component: Home, exact: true}
]

export const privateRouters: IRouter[] = [
    {path: RouterNames.PROFILE, component: Profile, exact: true},
    {path: RouterNames.HOME, component: Home, exact: true},
    {path: RouterNames.CREATE_ART, component: CreateArt, exact: true},
    {path: RouterNames.CART, component: Cart, exact: true},
    {path: RouterNames.FAVORITE, component: Favorites, exact: true},
    {path: RouterNames.SEARCH, component: Search, exact: false}
]
