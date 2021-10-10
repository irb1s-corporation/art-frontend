export interface IUser {
    email: string;
    nickname: string;
    name: string;
    surname: string;
    avatar: string;
    banned: boolean;
    about: string;
    banReason: boolean | null;
    role: object;
}