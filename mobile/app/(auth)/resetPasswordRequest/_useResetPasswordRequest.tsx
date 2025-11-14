import useFormBuilder from "@/app/components/formBuilderComponent";
import _useUserQuery from "@/app/queries/user.query";

export default function _useResetPasswordRequest() {

    const {resetPasswordRequest} = _useUserQuery();

    const {form} = useFormBuilder({
        email: {
            initial: "",
            validate: (v) => (!v || v.length === 0 || !v.includes("@") ? "Nome é obrigatório" : null)
        }
    });

    async function requestResetPassword() {
        await resetPasswordRequest.mutateAsync(form.email.value);
    }

    return {
        ...form,
        requestResetPassword,
        isPending: resetPasswordRequest.isPending,
        isSuccess: resetPasswordRequest.isSuccess,
        isError: resetPasswordRequest.isError
    }

}