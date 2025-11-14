import {useMutation} from "@tanstack/react-query";
import AuthService from "@/src/auth/auth.service";
import {LoginRequest} from "@/src/auth/dto/login.dto";

export default function _useLoginQuery() {
    const authService = new AuthService();

    const executeLogin = useMutation({
        mutationFn: (login: LoginRequest) => authService.login(login),
        onSuccess: async (data) => {
            localStorage.setItem("token", data.token!)
        },
        onError: (error) => {
            console.error(error);
        }
    });

    return {
        executeLogin
    }

}