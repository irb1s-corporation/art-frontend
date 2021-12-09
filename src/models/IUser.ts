export interface IUser {
    id: number;
    email: string;
    nickname: string;
    banner: string;
    avatar: string;
    banned: boolean;
    about: string;
    banReason: boolean | null;
    role: object;
    updatedAt: string;
}