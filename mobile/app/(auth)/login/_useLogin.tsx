import {LoginRequest} from "@/src/auth/dto/login.dto";
import {router} from "expo-router";
import _useLoginQuery from "@/app/(auth)/login/_login.query";
import useFormBuilder from "@/app/components/formBuilderComponent";

export default function _useLogin() {
    const {executeLogin} = _useLoginQuery();

    const {form} = useFormBuilder({
        email: {initial: "", validate: (v) => (!v || v.length === 0 || !v.includes("@") ? "Nome é obrigatório" : null)},
        password: {
            initial: "",
            validate: (v) => (!v || v.length === 0 || v.length < 6 ? "Sobrenome obrigatório" : null)
        },
    });

    async function login() {
        const login = {
            email: form.email.value,
            password: form.password.value
        } as LoginRequest

        await executeLogin.mutateAsync(login);
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

    return {...form, login, goToCreateAccount, isPending: executeLogin.isPending, isDisable, goToResetPasswordRequest}

}