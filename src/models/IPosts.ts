import {IUser} from "./IUser";

interface IAuthor {
    email: string,
    nickname: string,
    name: string,
    surname: string,
    avatar: string,
}

export interface IPosts {
    id: number;
    userId: number;
    title: string;
    price: number;
    likes: number;
    content: string;
    about: string;
    author: IAuthor
}