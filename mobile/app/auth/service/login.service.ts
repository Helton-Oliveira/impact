import {LoginRequest, LoginResponse} from "../dto/login.dto";
import {API_URL} from "@/app/root/config/environment";
import axios from "axios";

type ResponseType = LoginResponse;

export default class LoginService {

    private readonly BASE_URL = `${API_URL}/auth`;

    async login(loginRequest: LoginRequest): Promise<ResponseType> {
        const response = await axios.post(`${this.BASE_URL}/login`, loginRequest);
        return await response.data;
    }

}