import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import _styles from "@/app/(auth)/resetPasswordRequest/_styles";
import _useResetPasswordRequest from "@/app/(auth)/resetPasswordRequest/_useResetPasswordRequest";


export default function ResetPasswordRequestScreen() {
    const {email, requestResetPassword, isPending, isSuccess, isError} = _useResetPasswordRequest();

    return (
        <View style={_styles.container}>
            <View style={_styles.card}>
                <Text style={_styles.title}>Esqueceu sua senha?</Text>
                <Text style={_styles.subtitle}>Informe seu e-mail para enviarmos as instruções de redefinição.</Text>

                <TextInput style={_styles.textInput} placeholder={"Endereço de email..."} value={email.value}
                           placeholderTextColor="#244742" onChangeText={email.setValue}/>

                {isPending
                    ? <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}}/>
                    : <TouchableOpacity style={_styles.btn} onPress={() => requestResetPassword()}>
                        <Text style={_styles.textBtn}>Solicitar redefinição de senha</Text></TouchableOpacity>
                }

                {(isSuccess && !isPending) && (
                    <View style={_styles.confirmMessageCard}>
                        <Text style={_styles.confirmMessageText}>Email de recuperação enviado com sucesso!</Text>
                    </View>
                )}

                {isError && (
                    <View style={_styles.confirmMessageCardError}>
                        <Text style={_styles.confirmMessageTextError}>Erro ao enviar para o email {email.value}!</Text>
                    </View>
                )}

                <Text style={_styles.footerText}>Se você possui uma conta com este e-mail, enviaremos instruções
                    para redefinir sua senha.</Text>
            </View>
        </View>
    )
}