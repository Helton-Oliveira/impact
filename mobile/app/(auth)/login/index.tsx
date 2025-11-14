import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import _useLogin from "./_useLogin";
import _styles from "./_styles";
import {SafeAreaView} from "react-native-safe-area-context";

export default function LoginPage() {
    const {
        email,
        password,
        login,
        goToCreateAccount,
        isPending,
        isDisable,
        goToResetPasswordRequest
    } = _useLogin();

    return (
        <SafeAreaView style={_styles.container}>
            <View style={_styles.container1}>
                <Text style={_styles.title}>Donate & Invest</Text>

                <View style={_styles.inputSection}>
                    <Text style={_styles.welcomeText}>Bem-Vindo de volta!</Text>

                    <TextInput
                        placeholder="Email..." value={email.value} onChangeText={email.setValue}
                        placeholderTextColor="#91C9BF"
                        style={[!email.isTouched || email.isValid
                            ? _styles.textInput
                            : _styles.errorTextInput
                        ]} onBlur={email.validate}>
                    </TextInput>

                    <TextInput
                        placeholder="Senha..." value={password.value} onChangeText={password.setValue}
                        placeholderTextColor="#91C9BF" style={_styles.textInput} onBlur={password.validate}>
                    </TextInput>

                    <TouchableOpacity onPress={() => login()}
                                      style={[_styles.loginBtn, isDisable() && _styles.loginBtnDisabled]}
                                      disabled={isDisable()}>
                        {
                            isPending
                                ? <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}}/>
                                : <Text
                                    style={[_styles.textBtnLogin, isDisable() && _styles.loginTextDisabled]}>Login</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={_styles.forgotPassSection} onPress={goToResetPasswordRequest}>
                        <Text style={_styles.forgotPassBtn}>Esqueceu a Senha?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={_styles.createAccountBtn} onPress={() => {
                    goToCreateAccount()
                }}>
                    <Text style={_styles.textCreateAccountBtn}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

