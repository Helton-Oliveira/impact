import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import _useResetPasswordRequest from "@/app/(auth)/resetPasswordRequest/_useResetPasswordRequest";


export default function ResetPasswordRequestScreen() {
    const {email, requestResetPassword, isPending, isSuccess, isError} = _useResetPasswordRequest();

    return (
        <View className="flex-1 bg-background-primary items-center pt-[60px] pb-[160px] p-[10px]">
            <View
                className="w-full bg-background-secondary rounded-[15px] items-center p-[10px] gap-[30px] self-stretch">

                <Text className="text-text-default text-[37px] font-bold text-center">
                    Esqueceu sua senha?
                </Text>

                <Text className="text-text-default text-[18px] text-center">
                    Informe seu e-mail para enviarmos as instruções de redefinição.
                </Text>

                <TextInput
                    className="w-full h-[12%] bg-background-primary rounded-[10px] pl-[15px]"
                    placeholder="Endereço de email..."
                    placeholderTextColor="#244742"
                    value={email.value}
                    onChangeText={email.setValue}
                />

                {isPending ? (
                    <ActivityIndicator className="items-center justify-center"/>
                ) : (
                    <TouchableOpacity
                        className="w-full h-[12%] rounded-[10px] bg-accent-primary justify-center"
                        onPress={() => requestResetPassword()}
                    >
                        <Text className="font-bold text-[18px] text-center text-black">
                            Solicitar redefinição de senha
                        </Text>
                    </TouchableOpacity>
                )}

                {(isSuccess && !isPending) && (
                    <View className="
                w-full h-[9%] bg-green-100 rounded-[10px] justify-center
                border-2 border-green-600
            ">
                        <Text className="text-green-700 text-center">
                            Email de recuperação enviado com sucesso!
                        </Text>
                    </View>
                )}

                {isError && (
                    <View className="
                w-full h-[9%] bg-red-100 rounded-[10px] justify-center
                border-2 border-red-600
            ">
                        <Text className="text-red-700 text-center">
                            Erro ao enviar para o email {email.value}!
                        </Text>
                    </View>
                )}

                <Text className="text-text-default text-[15px] text-center">
                    Se você possui uma conta com este e-mail, enviaremos instruções para redefinir sua senha.
                </Text>

            </View>
        </View>

    )
}