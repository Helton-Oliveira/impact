import {useState} from "react";
import {LoginRequest} from "@/app/auth/dto/login.dto";
import LoginService from "@/app/auth/service/login.service";

export default function useLogin() {
    const service = new LoginService();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function login() {
        const login = {
            email: email,
            password: password
        } as LoginRequest
    }

    return {setEmail, email, password, setPassword, login}

}