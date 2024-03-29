import axios, {AxiosResponse} from "axios";
import {ROOT_URL} from "../config";

export default class UserService {

    static async Ref(token: string): Promise<AxiosResponse> {
        return axios.get('/auth/ref', {
            withCredentials: false,
            baseURL: ROOT_URL,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + token
            },
        })
            .then((res) => {
                return res
            })
            .catch((e) => {
                return e.response
            })
    }

    static async Login(email: string, password: string): Promise<AxiosResponse> {
        let Data = {
            email: email,
            password: password
        };
        return axios.post('/auth/login', Data, {
            withCredentials: false,
            baseURL: ROOT_URL,
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((res) => {
                return res
            })
            .catch((e) => {
                return e.response
            })
    }

    static async Reg(nickname: string, email: string, password: string): Promise<AxiosResponse> {
        let Data = {
            nickname: nickname,
            email: email,
            password: password
        };
        return axios.post('/auth/reg', Data, {
            withCredentials: false,
            baseURL: ROOT_URL,
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((res) => {
                return res;
            })
            .catch(error => {
                return error.response
            })
    }
}