import AuthService from "@/src/auth/auth.service";
import {router} from "expo-router";
import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import User from "@/src/user/user.model";
import useFormBuilder from "@/app/components/formBuilderComponent";
import UserService from "@/src/user/user.service";
import {Role} from "@/src/root/Role";
import AppFile from "@/src/file/file.mode";
import {FileType} from "@/src/file/file.type.enum";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

type ExpoAsset = ImagePicker.ImagePickerAsset;

export default function useCreateAccount() {
    const service = new AuthService();
    const userService = new UserService();

    const [uriImage, setUriImage] = useState<ExpoAsset | null>(null);

    const {form, validateAll, resetAll} = useFormBuilder({
        firstName: {
            initial: "",
            validate: (v) => (!v ? "Nome é obrigatório" : null),
            onError: (msg) => console.warn(msg)
        },
        lastName: {
            initial: "",
            validate: (v) => (!v ? "Email é obrigatório" : !v.includes("@") ? "Email inválido" : null),
            onError: (msg) => console.warn(msg)
        },
        email: {
            initial: "",
            validate: (v) => (v.length < 6 ? "Senha deve ter ao menos 6 caracteres" : null),
            onError: (msg) => console.warn(msg)
        },
        phone: {
            initial: "",
            validate: () => null
        },
        cpf: {
            initial: "",
            validate: () => null
        },
        password: {
            initial: "",
            validate: (v) => (v.length < 6 ? "Senha deve ter ao menos 6 caracteres" : null),
            onError: (msg) => console.warn(msg)
        },
        confirmPassword: {
            initial: "",
            validate: () => null
        }
    })

    function goToLogin(): void {
        router.push("/login")
    }

    async function createUser() {
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
        await userService.create(user);
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

    return {
        goToLogin,
        handleAvatarSelect,
        createUser,
        ...form
    }
}