import {router} from "expo-router";
import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import User from "@/modules/user/user.model";
import useFormBuilder from "@/shared/components/formBuilderComponent";
import {Role} from "@/modules/root/Role";
import AppFile from "@/modules/file/file.mode";
import {FileType} from "@/modules/file/file.type.enum";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import _useUserQuery from "@/shared/queries/user.query";

type ExpoAsset = ImagePicker.ImagePickerAsset;

export default function useCreateAccount() {
    const {createUser} = _useUserQuery();

    const [uriImage, setUriImage] = useState<ExpoAsset | null>(null);

    const {form} = useFormBuilder({
        firstName: {initial: "", validate: (v) => (!v || v.length === 0 ? "Nome é obrigatório" : null)},
        lastName: {initial: "", validate: (v) => (!v || v.length === 0 ? "Sobrenome obrigatório" : null)},
        email: {initial: "", validate: (v) => (!v.includes("@") || v.length === 0 ? "Email inválido" : null)},
        phone: {initial: "", validate: () => null},
        cpf: {initial: "", validate: () => null},
        password: {initial: "", validate: (v) => (v.length < 6 ? "Senha mínima de 6" : null)},
        confirmPassword: {initial: "", validate: () => null}
    });

    function goToLogin(): void {
        router.push("/login")
    }

    async function saveUser() {
        const user = {
            uuid: uuidv4(),
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            password: form.password.value,
            cpf: form.cpf.value,
            phoneNumber: form.phone.value,
            files: uriImage ? await saveFile() : [],
            role: Role.USER,
            active: true,
            _edited: true
        } as User
        await createUser.mutateAsync(user)
    }

    async function saveFile(): Promise<AppFile[]> {
        const file = new AppFile();
        file.name = uriImage?.fileName ?? "";
        file.path = uriImage?.uri;
        file.type = FileType.IMG;
        file.active = true;
        file._edited = true;

        await file.convertToBase64(uriImage?.uri);
        return [file];
    }

    function handleAvatarSelect(asset: ExpoAsset): void {
        setUriImage(asset);
    }

    function canSubmit(): boolean {
        const formIsValid = Object.values(form).every(f => f.isValid);
        const isAnyFieldTouched = Object.values(form).some(f => f.isTouched);

        return formIsValid && isAnyFieldTouched;
    }

    function isDisable(): boolean {
        return createUser.isPending || !canSubmit();
    }

    return {
        goToLogin,
        handleAvatarSelect,
        saveUser,
        isPending: createUser.isPending,
        isSuccess: createUser.isSuccess,
        isError: createUser.isError,
        error: createUser.error,
        isDisable,
        ...form
    }
}