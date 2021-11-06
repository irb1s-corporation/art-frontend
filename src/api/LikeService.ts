import axios, {AxiosPromise} from "axios";
import {ROOT_URL} from "../config";


export default class LikeService {
    static async like(postId: number, token: string): Promise<AxiosPromise> {
        let Data = {
            postId: postId
        }
        return axios.post('/likes', Data, {
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
            .catch((error) => {
                return error.response
            })
    }
}