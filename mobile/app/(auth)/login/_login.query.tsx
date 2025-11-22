import {useMutation, useQuery} from "@tanstack/react-query";
import AuthService from "@/modules/auth/auth.service";
import {LoginRequest} from "@/modules/auth/dto/login.dto";
import {getAccessToken, setAccessToken, setRefreshToken} from "@/modules/root/session.utils";
import UserService from "@/modules/user/user.service";

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

    const getNewAccessToken = useMutation({
        mutationFn: (refreshToken: string) => authService.getNewAccessToken(refreshToken),
        onSuccess: async (data) => {
            if (data.accessToken) {
                await setAccessToken(data.accessToken);
            }
        },
        onError: (err) => console.log(err)
    });

    return {
        executeLogin,
        getCurrentUser,
        getNewAccessToken
    }

}