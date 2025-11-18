import {useMutation} from "@tanstack/react-query";
import AuthService from "@/src/auth/auth.service";
import {LoginRequest} from "@/src/auth/dto/login.dto";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export default function _useLoginQuery() {
    const authService = new AuthService();

    const executeLogin = useMutation({
        mutationFn: (login: LoginRequest) => authService.login(login),
        onSuccess: async (data) => {
            try {
                await asyncStorage.setItem("token", JSON.stringify(data.token))
            } catch (e) {
                console.error(e);
            }
        }
    });

    return {
        executeLogin
    }

}