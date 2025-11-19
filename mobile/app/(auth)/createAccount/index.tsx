import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import useCreateAccount from "./_useCreateAccount"
import ImageLoader from "@/components/imageLoader";

export default function CreateAccount() {
    const {
        firstName,
        lastName,
        password,
        confirmPassword,
        email,
        phone,
        cpf,
        goToLogin,
        handleAvatarSelect,
        saveUser,
        isPending,
        isSuccess,
        isError,
        error,
        isDisable
    } = useCreateAccount();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
        >
            <View className="flex-1 bg-background-primary items-center p-[15px]">
                <ScrollView className="flex-1 w-full">
                    <View className="pb-5 gap-5">

                        {/* NOME */}
                        <View className="gap-2 items-start">
                            <Text className="font-bold text-[18px] text-text-default">Nome</Text>
                            <TextInput
                                className={
                                    !firstName.isTouched || firstName.isValid
                                        ? "w-[354px] h-[55px] bg-background-secondary rounded-[10px] pl-3"
                                        : "w-[354px] h-[55px] bg-background-secondary border border-status-error rounded-[10px] pl-3"
                                }
                                placeholderTextColor="#91C9BF"
                                value={firstName.value}
                                placeholder="Entre com o seu nome"
                                onChangeText={firstName.setValue}
                                onBlur={firstName.validate}
                            />
                        </View>

                        {/* SOBRENOME */}
                        <View className="gap-2 items-start">
                            <Text className="font-bold text-[18px] text-text-default">Sobrenome</Text>
                            <TextInput
                                className={
                                    !lastName.isTouched || lastName.isValid
                                        ? "w-[354px] h-[55px] bg-background-secondary rounded-[10px] pl-3"
                                        : "w-[354px] h-[55px] bg-background-secondary border border-status-error rounded-[10px] pl-3"
                                }
                                placeholderTextColor="#91C9BF"
                                value={lastName.value}
                                placeholder="Entre com o seu sobrenome"
                                onChangeText={lastName.setValue}
                                onBlur={lastName.validate}
                            />
                        </View>

                        <ImageLoader
                            onImageSelected={handleAvatarSelect}
                            textInput="Selecionar foto de perfil"
                            switchButtonText="Mudar Foto"
                            actionField="Foto de Perfil (Opcional)"
                        />

                        {/* EMAIL */}
                        <View className="gap-2 items-start">
                            <Text className="font-bold text-[18px] text-text-default">Email</Text>
                            <TextInput
                                className={
                                    !email.isTouched || email.isValid
                                        ? "w-[354px] h-[55px] bg-background-secondary rounded-[10px] pl-3"
                                        : "w-[354px] h-[55px] bg-background-secondary border border-status-error rounded-[10px] pl-3"
                                }
                                placeholderTextColor="#91C9BF"
                                value={email.value}
                                placeholder="Entre com o seu Email"
                                onChangeText={email.setValue}
                                onBlur={email.validate}
                            />
                        </View>

                        {/* TELEFONE */}
                        <View className="gap-2 items-start">
                            <Text className="font-bold text-[18px] text-text-default">Telefone (Ex: 99
                                99999-9999)</Text>
                            <TextInput
                                className={
                                    !phone.isTouched || phone.isValid
                                        ? "w-[354px] h-[55px] bg-background-secondary rounded-[10px] pl-3"
                                        : "w-[354px] h-[55px] bg-background-secondary border border-status-error rounded-[10px] pl-3"
                                }
                                placeholderTextColor="#91C9BF"
                                value={phone.value}
                                placeholder="Seu número de telefone"
                                keyboardType="phone-pad"
                                onChangeText={phone.setValue}
                                onBlur={phone.validate}
                            />
                        </View>

                        {/* CPF */}
                        <View className="gap-2 items-start">
                            <Text className="font-bold text-[18px] text-text-default">CPF</Text>
                            <TextInput
                                className={
                                    !cpf.isTouched || cpf.isValid
                                        ? "w-[354px] h-[55px] bg-background-secondary rounded-[10px] pl-3"
                                        : "w-[354px] h-[55px] bg-background-secondary border border-status-error rounded-[10px] pl-3"
                                }
                                placeholderTextColor="#91C9BF"
                                value={cpf.value}
                                placeholder="Seu número de CPF"
                                keyboardType="numeric"
                                onChangeText={cpf.setValue}
                                onBlur={cpf.validate}
                            />
                        </View>

                        {/* SENHA */}
                        <View className="gap-2 items-start">
                            <Text className="font-bold text-[18px] text-text-default">Senha</Text>
                            <TextInput
                                className={
                                    !password.isTouched || password.isValid
                                        ? "w-[354px] h-[55px] bg-background-secondary rounded-[10px] pl-3"
                                        : "w-[354px] h-[55px] bg-background-secondary border border-status-error rounded-[10px] pl-3"
                                }
                                placeholderTextColor="#91C9BF"
                                value={password.value}
                                placeholder="Entre com sua senha"
                                onChangeText={password.setValue}
                                onBlur={password.validate}
                            />
                        </View>

                        {/* CONFIRMAR SENHA */}
                        <View className="gap-2 items-start">
                            <Text className="font-bold text-[18px] text-text-default">Confirme sua senha</Text>
                            <TextInput
                                className={
                                    !confirmPassword.isTouched || confirmPassword.isValid
                                        ? "w-[354px] h-[55px] bg-background-secondary rounded-[10px] pl-3"
                                        : "w-[354px] h-[55px] bg-background-secondary border border-status-error rounded-[10px] pl-3"
                                }
                                placeholderTextColor="#91C9BF"
                                value={confirmPassword.value}
                                placeholder="Confirme sua senha"
                                onChangeText={confirmPassword.setValue}
                                onBlur={confirmPassword.validate}
                            />
                        </View>

                    </View>
                </ScrollView>

                {/* BOTÃO */}
                <TouchableOpacity
                    className={
                        isDisable()
                            ? `${"bg-accent-primary w-[360px] h-[55px] rounded-[10px] justify-center mb-5"} bg-state-disabled`
                            : "bg-accent-primary w-[360px] h-[55px] rounded-[10px] justify-center mb-5"
                    }
                    disabled={isDisable()}
                    onPress={saveUser}
                >
                    {!isPending ? (
                        <Text
                            className={
                                isDisable()
                                    ? `${"text-center font-bold text-[25px]"} ${"text-text-disabled"}`
                                    : "text-center font-bold text-[25px]"
                            }
                        >
                            Criar conta
                        </Text>
                    ) : (
                        <ActivityIndicator className="items-center justify-center"/>
                    )}
                </TouchableOpacity>

                {/* REDIRECT */}
                <TouchableOpacity onPress={goToLogin}>
                    <Text className="text-text-secondary text-[16px] underline mb-20">
                        Já possui uma conta? Login
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>


    )
}