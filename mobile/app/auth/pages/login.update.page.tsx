import {StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import useLogin from "./use.login.update";

export default function LoginPage() {
    const {
        setEmail,
        email,
        setPassword,
        password,
        login,
    } = useLogin();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Bem-Vindo de volta!</Text>
            <TextInput
                placeholder="Email..."
                value={email}
                onChangeText={(email) => {
                    setEmail(email)
                }}>
            </TextInput>

            <TextInput
                placeholder="Senha..."
                value={password}
                onChangeText={(password) => {
                    setPassword(password)
                }}>
            </TextInput>

            <TouchableOpacity onPress={() => login()}>
                <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Criar conta</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
});