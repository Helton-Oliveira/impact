import {LoginRequest, LoginResponse} from "@/src/auth/dto/login.dto";
import api from "@/src/root/api";

type EntityResponseType = LoginResponse;

export default class AuthService {

    async login(loginRequest: LoginRequest): Promise<EntityResponseType> {
        const response = await api.post(`/auth/login`, loginRequest);
        return await response.data;
    }

    async getNewAccessToken(refreshToken: string): Promise<EntityResponseType> {
        const params = {
            refreshToken: refreshToken
        }
        return api.post(`/auth/refresh`, params)
            .then(res => res.data)
    }

}