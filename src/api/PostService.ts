import axios, {AxiosPromise, AxiosResponse} from "axios";
import {ROOT_URL} from "../config";

export default class PostService {

    static async getPopular(): Promise<AxiosPromise> {
        return axios.get('/posts/popular', {
            baseURL: ROOT_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((res) => {
            return res
        })
            .catch((e) => {
                return e.response
            })
    }

    static async getLikes(token: string): Promise<AxiosPromise> {
        return axios.get('/posts/likes', {
            baseURL: ROOT_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + token
            },
        }).then((res) => {
            return res
        })
            .catch((e) => {
                return e.response
            })
    }

    static async getCart(token: string): Promise<AxiosPromise> {

        return axios.get('/posts/cart', {
            baseURL: ROOT_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
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
            baseURL: ROOT_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + token
            },
        }).then((res) => {
            return res
        })
            .catch((e) => {
                return e.response
            })
    }


    static async like(postId: number, token: string): Promise<AxiosPromise> {
        let Data = {
            postId: postId
        }
        return axios.post('/likes', Data, {
            baseURL: ROOT_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + token
            },
        }).then((res) => {
            return res
        })
            .catch((error) => {
                return error.response
            })
    }

    static async findPosts(content: string): Promise<AxiosResponse> {
        return axios.get('/posts/search/' + content, {
            baseURL: ROOT_URL,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }).then((res) => {
            return res
        }).catch((error) => {
            return error.response
        })
    }
    static async findOne(id: number): Promise<AxiosResponse> {
        return axios.get('/posts/id/' + id, {
            baseURL: ROOT_URL,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }).then((res) => {
            return res
        }).catch((error) => {
            return error.response
        })
    }

    static async addToCart(postId: number, token: string): Promise<AxiosPromise> {
        let Data = {
            postId: postId,
        }
        return axios.post('/cart', Data, {
            baseURL: ROOT_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: 'Bearer ' + token
            },
        }).then((res) => {
            return res
        })
            .catch((error) => {
                return error.response
            })
    }
}