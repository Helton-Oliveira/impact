import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import _useResetPassword from "@/app/(auth)/resetPassword/_useResetPassword";


export default function ResetPasswordScreen() {
    const {
        requestResetPassword,
        password,
        confirmPassword,
        isSuccess,
        isPending,
        isError,
        canSubmit,
        goLoginPage
    } = _useResetPassword();

    return (
        <View className="flex-1 bg-background-primary items-center pt-[130px] pb-[160px] p-[10px]">
            <View
                className="w-full bg-background-secondary rounded-[15px] items-center p-[10px] gap-[30px] self-stretch">

                <Text className="text-text-default text-[37px] font-bold text-center">
                    Resetar senha
                </Text>

                <Text className="text-text-default text-[18px] text-center">
                    Crie uma nova senha segura para sua conta.
                </Text>

                <TextInput
                    className="w-full h-[12%] bg-background-tertiary rounded-[10px] pl-[15px]"
                    placeholder="Nova senha..."
                    placeholderTextColor="#244742"
                    textContentType="password"
                    value={password.value}
                    onChangeText={password.setValue}
                />

                <TextInput
                    className="w-full h-[12%] bg-background-tertiary rounded-[10px] pl-[15px]"
                    placeholder="Confirme a nova senha..."
                    placeholderTextColor="#244742"
                    value={confirmPassword.value}
                    onChangeText={confirmPassword.setValue}
                />

                {isPending ? (
                    <ActivityIndicator className="items-center justify-center"/>
                ) : (
                    <TouchableOpacity
                        className={`w-full h-[12%] rounded-[10px] justify-center ${
                            canSubmit() ? "bg-accent-primary" : "bg-state-disabled"
                        }`}
                        disabled={!canSubmit()}
                        onPress={() => requestResetPassword()}
                    >
                        <Text className="font-bold text-[18px] text-center text-text-default">
                            Redefinir senha
                        </Text>
                    </TouchableOpacity>
                )}

                {(isSuccess && !isPending) && (
                    <View className="
                w-full h-[9%] rounded-[10px] justify-center
                bg-green-100 border-2 border-green-600
            ">
                        <Text className="text-green-700 text-center">
                            Senha alterada com sucesso!
                        </Text>
                    </View>
                )}

                {isError && (
                    <View className="
                w-full h-[9%] rounded-[10px] justify-center
                bg-red-100 border-2 border-red-600
            ">
                        <Text className="text-red-700 text-center">
                            Erro ao resetar senha!
                        </Text>
                    </View>
                )}

            </View>
        </View>

    )
}