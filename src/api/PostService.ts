import axios, {AxiosPromise} from "axios";
import {ROOT_URL} from "../config";

export default class PostService {
    static async getPopular(): Promise<AxiosPromise> {
        return axios.get('/posts/popular', {
            withCredentials: false,
            baseURL: ROOT_URL,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((res) => {
                return res
            })
            .catch((e) => {
                return e.response
            })
    }

    static async getLikes(token: string): Promise<AxiosPromise> {
        return axios.get('/posts/likes', {
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

    static async createPost(token: string, title: string, files: any, about: string, price: string): Promise<AxiosPromise> {
        let formData = new FormData();
        for (let i = 0, file; i < files.length; i++) {
            file = files.item(i);
            formData.append('image', file);
        }
        formData.append('title', title);
        formData.append('price', price);
        formData.append('about', about);

        return axios.post('/posts/create', formData, {
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
}