import useFormBuilder from "@/app/components/formBuilderComponent";
import _useUserQuery from "@/app/queries/user.query";
import {router, useLocalSearchParams} from "expo-router";

export default function _useResetPassword() {

    const {resetPassword} = _useUserQuery();
    const params = useLocalSearchParams();

    const {form} = useFormBuilder({
        password: {
            initial: "",
            validate: (v) => (!v || v.length === 0 || v.length < 6 ? "Nome é obrigatório" : null)
        },
        confirmPassword: {
            initial: "",
        }
    });

    async function requestResetPassword() {
        const newPassword = form.password.value;
        const resetKey = params.resetKey as string;

        await resetPassword.mutateAsync({newPassword, resetKey});
    }

    function canSubmit(): boolean {
        const formIsValid = Object.values(form).every(f => f.isValid);
        const isAnyFieldTouched = Object.values(form).some(f => f.isTouched);

        return !resetPassword.isPending && formIsValid && isAnyFieldTouched;
    }

    function goLoginPage() {
        router.push("/login")
    }

    return {
        ...form,
        requestResetPassword,
        isPending: resetPassword.isPending,
        isSuccess: resetPassword.isSuccess,
        isError: resetPassword.isError,
        canSubmit,
        goLoginPage
    }

}