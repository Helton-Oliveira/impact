import {useState} from "react";
import {LoginRequest} from "@/src/auth/dto/login.dto";
import LoginService from "@/src/auth/auth.service";

export default function _useLogin() {
    const service = new LoginService();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function login() {
        const login = {
            email: email,
            password: password
        } as LoginRequest

        const token = await service.login(login);

        console.log(token);
    }

    return {setEmail, email, password, setPassword, login}

}