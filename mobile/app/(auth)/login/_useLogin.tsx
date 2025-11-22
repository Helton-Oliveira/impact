import {LoginRequest} from "@/modules/auth/dto/login.dto";
import {router} from "expo-router";
import _useLoginQuery from "@/app/(auth)/login/_login.query";
import useFormBuilder from "@/shared/components/formBuilderComponent";
import {getAccessToken, loadTokensFromStorage, setAccessToken, setRefreshToken} from "@/modules/root/session.utils";
import {useEffect, useState} from "react";

export default function _useLogin() {
    const {executeLogin, getCurrentUser} = _useLoginQuery();
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const {data: user, isLoading} = getCurrentUser();

    const {form} = useFormBuilder({
        email: {
            initial: "",
            validate: (v) => (!v || v.length === 0 || !v.includes("@") ? "Nome é obrigatório" : null)
        },
        password: {
            initial: "",
            validate: (v) => (!v || v.length === 0 || v.length < 6 ? "Sobrenome obrigatório" : null)
        },
    });

    useEffect(() => {
        async function init() {
            await loadTokensFromStorage();
            setTokenLoaded(true);

            const token = getAccessToken();
            if (token && user) {
                router.replace("/(tabs)/home");
            }
        }

        init();
    }, [user]);

    async function login() {
        const login = {
            email: form.email.value,
            password: form.password.value
        } as LoginRequest

        await executeLogin.mutateAsync(login);

        if (executeLogin.isSuccess) {
            const accessToken = executeLogin.data.accessToken;
            const refreshToken = executeLogin.data.refreshToken;

            if (accessToken) await setAccessToken(accessToken);
            if (refreshToken) await setRefreshToken(refreshToken);

            const {data: user} = getCurrentUser();
            if (user) router.replace("/(tabs)/home");
        }
    }

    function goToCreateAccount(): void {
        router.push("/createAccount")
    }

    function canSubmit(): boolean {
        const formIsValid = Object.values(form).every(f => f.isValid);
        const isAnyFieldTouched = Object.values(form).some(f => f.isTouched);

        return formIsValid && isAnyFieldTouched;
    }

    function isDisable(): boolean {
        return executeLogin.isPending || !canSubmit();
    }

    function goToResetPasswordRequest() {
        router.push("/resetPasswordRequest");
    }

    return {
        ...form,
        login,
        goToCreateAccount,
        isPending: executeLogin.isPending,
        isDisable,
        goToResetPasswordRequest,
        getCurrentUser,
        tokenLoaded,
        isLoadingUser: isLoading,
        user
    }

}