import {Text, TextInput, TouchableOpacity, View} from "react-native";
import _useLogin from "./_useLogin";
import _styles from "./_styles";
import {SafeAreaView} from "react-native-safe-area-context";

export default function LoginPage() {
    const {
        setEmail,
        email,
        setPassword,
        password,
        login,
        goToCreateAccount
    } = _useLogin();

    return (
        <SafeAreaView style={_styles.container}>
            <View style={_styles.container1}>
                <Text style={_styles.title}>Donate & Invest</Text>

                <View style={_styles.inputSection}>
                    <Text style={_styles.welcomeText}>Bem-Vindo de volta!</Text>

                    <TextInput
                        placeholder="Email..."
                        value={email}
                        onChangeText={(email) => {
                            setEmail(email)
                        }}
                        placeholderTextColor="#91C9BF"
                        style={_styles.textInput}>
                    </TextInput>

                    <TextInput
                        placeholder="Senha..."
                        value={password}
                        onChangeText={(password) => {
                            setPassword(password)
                        }}
                        placeholderTextColor="#91C9BF"
                        style={_styles.textInput}>
                    </TextInput>

                    <TouchableOpacity
                        onPress={() => login()}
                        style={_styles.loginBtn}
                    >
                        <Text style={_styles.textBtnLogin}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={_styles.forgotPassBtn}>Esqueceu a Senha?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={_styles.createAccountBtn}
                    onPress={() => {
                        goToCreateAccount()
                    }}
                >
                    <Text style={_styles.textCreateAccountBtn}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

