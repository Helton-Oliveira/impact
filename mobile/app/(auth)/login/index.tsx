import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import _useLogin from "./_useLogin";
import {SafeAreaView} from "react-native-safe-area-context";

export default function LoginPage() {
    const {
        email,
        password,
        login,
        goToCreateAccount,
        isPending,
        isDisable,
        goToResetPasswordRequest,
    } = _useLogin();

    return (
        <SafeAreaView className="flex-1 bg-background-primary items-center justify-center ">
            <View className="items-center justify-center">
                <Text className="text-text-default font-bold text-3xl bottom-10">
                    Donate & Invest
                </Text>

                <View className="flex gap-5 items-center">
                    <Text className="text-text-default text-xl ">Bem-Vindo de volta!</Text>

                    <TextInput
                        placeholder="Email..." value={email.value} onChangeText={email.setValue}
                        placeholderTextColor="#91C9BF"
                        className={
                            !email.isTouched || email.isValid
                                ? "w-96 size-16 bg-background-secondary rounded-md p-5"
                                : "w-96 size-16 text-text-disabled p-5 rounded-md border border-rose-600"
                        } onBlur={email.validate}>
                    </TextInput>

                    <TextInput
                        placeholder="Senha..." value={password.value} onChangeText={password.setValue}
                        placeholderTextColor="#91C9BF"
                        className={
                            !password.isTouched || password.isValid
                                ? "w-96 size-16 bg-background-secondary rounded-md p-5"
                                : "w-96 size-16 text-text-disabled p-5 border border-rose-600 rounded-md"}
                        onBlur={password.validate}>
                    </TextInput>

                    <TouchableOpacity onPress={() => login()}
                                      className={
                                          ` items-center justify-center w-96 size-16 rounded-md 
                                      ${isDisable() ? "bg-state-disabled" : "bg-accent-primary"}`}
                                      disabled={isDisable()}>
                        {
                            isPending
                                ? <ActivityIndicator className="items-center justify-center"/>
                                : <Text
                                    className={
                                        ` text-2xl font-bold
                                        ${isDisable() && "color-text-disabled"}`
                                    }>Login</Text>
                        }

                    </TouchableOpacity>

                    <TouchableOpacity className=""
                                      onPress={goToResetPasswordRequest}>
                        <Text className="text-text-  underline">Esqueceu a Senha?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    className="items-center justify-center bg-accent-primary w-52 size-12 rounded-md top-40"
                    onPress={() => {
                        goToCreateAccount()
                    }}>
                    <Text className="font-bold text-text-default text-lg">Criar conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

