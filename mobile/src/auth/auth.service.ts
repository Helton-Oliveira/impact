import {LoginRequest, LoginResponse} from "@/src/auth/dto/login.dto";
import api from "@/src/root/api";

type ResponseType = LoginResponse;

export default class AuthService {

    async login(loginRequest: LoginRequest): Promise<ResponseType> {
        const response = await api.post(`/auth/login`, loginRequest);
        return await response.data;
    }

}