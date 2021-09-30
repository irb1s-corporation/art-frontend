import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";

export default class UserService {
    static async Auth(email: string, password: string): Promise<AxiosResponse> {
        return axios.post('./users.json')
    }
}