import {IAuthor} from "./IAuthor";
import {IUser} from "./IUser";

interface ILikes {
    userId: number,
    user: IUser,
}

interface ICart {
    userId: number,
    user: IUser,
}

interface IView {
    id: number,
    postId: number,
    userId: number,
}

export interface IPosts {
    id: number;
    userId: number;
    title: string;
    price: number;
    likes: ILikes[];
    inCart: ICart[];
    content: string;
    createdAt: string;
    about: string;
    author: IAuthor;
    views?: IView[];
}