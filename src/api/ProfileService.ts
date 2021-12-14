import axios, {AxiosResponse} from "axios";
import {ROOT_URL} from "../config";

export default class ProfileService {
    static async submitInfo(token: string, name: string, surname: string, about: string): Promise<AxiosResponse> {
        let Data = {
            name: name,
            surname: surname,
            about: about
        };
        return axios.post('/profile/edit', Data, {
            withCredentials: false,
            baseURL: ROOT_URL,
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
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

    static async submitAvatar(token: string, files: any): Promise<AxiosResponse> {
        let formData = new FormData();

        for (let i = 0, file; i < files.length; i++) {
            file = files.item(i);
            formData.append('avatar', file);
        }
        return axios.post('/profile/avatar', formData, {
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

    static async submitBanner(token: string, files: any): Promise<AxiosResponse> {
        let formData = new FormData();
        for (let i = 0, file; i < files.length; i++) {
            file = files.item(i);
            formData.append('banner', file);
        }
        return axios.post('/profile/banner', formData, {
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

    static async getUserPosts(token: string): Promise<AxiosResponse> {
        return axios.get('/posts/user', {
            baseURL: ROOT_URL,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            return res
        }).catch((error) => {
            return error.response
        })
    }


}