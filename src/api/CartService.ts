import axios, {AxiosPromise} from "axios";
import {ROOT_URL} from "../config";

export default class CartService {

    static async deletePost(id: number, token: string): Promise<AxiosPromise> {
        return axios.delete('/cart/post/' + id, {
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

    static async deleteAllPosts(token: string): Promise<AxiosPromise> {
        return axios.delete('/cart', {
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

}