import useFormBuilder from "@/app/components/formBuilderComponent";
import _useUserQuery from "@/app/queries/user.query";
import {createURL} from "expo-linking";

export default function _useResetPasswordRequest() {

    const {resetPasswordRequest} = _useUserQuery();
    const url = createURL("/resetPassword");

    const {form} = useFormBuilder({
        email: {
            initial: "",
            validate: (v) => (!v || v.length === 0 || !v.includes("@") ? "Nome é obrigatório" : null)
        }
    });

    async function requestResetPassword() {
        const dto = {
            email: form.email.value,
            url: url,
        }
        await resetPasswordRequest.mutateAsync(dto);
    }

    return {
        ...form,
        requestResetPassword,
        isPending: resetPasswordRequest.isPending,
        isSuccess: resetPasswordRequest.isSuccess,
        isError: resetPasswordRequest.isError,
    }

}