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
}