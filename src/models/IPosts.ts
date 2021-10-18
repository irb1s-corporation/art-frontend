import {IUser} from "./IUser";

export interface IPosts {
    id:number;
    userId: number;
    title: string;
    price: number;
    likes: number;
    content: string;
    about: string;
    author: IUser
}