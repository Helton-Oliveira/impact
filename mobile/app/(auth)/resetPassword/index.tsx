import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import _styles from "@/app/(auth)/resetPassword/_styles";
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
        <View style={_styles.container}>
            <View style={_styles.card}>
                <Text style={_styles.title}>Resetar senha</Text>
                <Text style={_styles.subtitle}>Crie uma nova senha segura para sua conta.</Text>

                <TextInput style={_styles.textInput} placeholder={"Nova senha..."} value={password.value}
                           textContentType="password"
                           placeholderTextColor="#244742" onChangeText={password.setValue}/>

                <TextInput style={_styles.textInput} placeholder={"Confirme a nova senha..."}
                           value={confirmPassword.value}
                           placeholderTextColor="#244742" onChangeText={confirmPassword.setValue}/>

                {isPending
                    ? <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}}/>
                    : <TouchableOpacity style={_styles.btn} onPress={() => requestResetPassword()}
                                        disabled={!canSubmit()}>
                        <Text style={_styles.textBtn}>Redefinir senha</Text></TouchableOpacity>
                }

                {(isSuccess && !isPending) && (
                    <View style={_styles.confirmMessageCard}>
                        <Text style={_styles.confirmMessageText}>Senha alterada com sucesso!</Text>
                    </View>
                )}

                {isError && (
                    <View style={_styles.confirmMessageCardError}>
                        <Text style={_styles.confirmMessageTextError}>Erro ao resetar senha!</Text>
                    </View>
                )}

            </View>
        </View>
    )
}