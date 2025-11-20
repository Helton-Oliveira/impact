import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import _useLogin from "./_useLogin";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

export default function LoginPage() {
    const {
        email,
        password,
        login,
        goToCreateAccount,
        isPending,
        isDisable,
        goToResetPasswordRequest,
        tokenLoaded,
        isLoadingUser,
        user
    } = _useLogin();


    if (!tokenLoaded || isLoadingUser) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    if (user) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-background-primary justify-center">
            <View className="items-center justify-center top-[-130]">
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
                                ? "w-96 size-16 bg-background-secondary rounded-lg p-5"
                                : "w-96 size-16 text-text-disabled p-5 rounded-lg border border-rose-600"
                        } onBlur={email.validate}>
                    </TextInput>

                    <TextInput
                        placeholder="Senha..." value={password.value} onChangeText={password.setValue}
                        placeholderTextColor="#91C9BF"
                        className={
                            !password.isTouched || password.isValid
                                ? "w-96 size-16 bg-background-secondary rounded-lg p-5"
                                : "w-96 size-16 text-text-disabled p-5 border border-rose-600 rounded-lg"}
                        onBlur={password.validate}>
                    </TextInput>

                    <TouchableOpacity onPress={() => login()}
                                      className={
                                          ` items-center justify-center w-96 size-16 rounded-lg 
                                      ${isDisable() ? "bg-state-disabled" : "bg-accent-primary"}`}
                                      disabled={isDisable()}>
                        {
                            isPending
                                ? <ActivityIndicator className="items-center justify-center"/>
                                : <Text
                                    className={
                                        ` text-2xl font-bold text-text-default
                                        ${isDisable() && "color-text-disabled"}`
                                    }>Login</Text>
                        }

                    </TouchableOpacity>

                    <TouchableOpacity className=""
                                      onPress={goToResetPasswordRequest}>
                        <Text className="text-text-default underline">Esqueceu a Senha?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    className="items-center justify-center bg-accent-primary w-52 size-12 rounded-lg top-40"
                    onPress={() => {
                        goToCreateAccount()
                    }}>
                    <Text className="font-bold text-text-default text-lg">Criar conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

