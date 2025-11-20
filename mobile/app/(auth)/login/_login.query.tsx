import {useMutation, useQuery} from "@tanstack/react-query";
import AuthService from "@/src/auth/auth.service";
import {LoginRequest} from "@/src/auth/dto/login.dto";
import {getAccessToken, setAccessToken, setRefreshToken} from "@/src/root/session.utils";
import UserService from "@/src/user/user.service";

export default function _useLoginQuery() {
    const authService = new AuthService();
    const userService = new UserService();

    const executeLogin = useMutation({
        mutationFn: (login: LoginRequest) => authService.login(login),
        onSuccess: async (data) => {
            if (data.accessToken && data.refreshToken) {
                await setAccessToken(data.accessToken);
                await setRefreshToken(data.refreshToken);
            }
        }
    });

    const getCurrentUser = () => {
        const token = getAccessToken();
        return useQuery({
            queryKey: ['userSession'],
            queryFn: () => userService.getCurrentUser(),
            enabled: Boolean(token),
        });
    };

    return {
        executeLogin,
        getCurrentUser
    }

}