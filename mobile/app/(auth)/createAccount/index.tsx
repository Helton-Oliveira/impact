import {ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import _styles from "@/app/(auth)/createAccount/_styles";
import useCreateAccount from "./_useCreateAccount"
import ImageLoader from "@/app/components/imageLoader";

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
        <View style={_styles.container}>
            <ScrollView style={_styles.scrollableAre}>
                <View style={_styles.formSection}>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Nome</Text>
                        <TextInput
                            style={[!firstName.isTouched || firstName.isValid
                                ? _styles.textInput
                                : _styles.errorInput
                            ]}
                            placeholderTextColor="#91C9BF" value={firstName.value}
                            placeholder="Entre com o seu nome" onChangeText={firstName.setValue}
                            onBlur={firstName.validate}/>
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Sobrenome</Text>
                        <TextInput
                            style={[!lastName.isTouched || lastName.isValid ? _styles.textInput : _styles.errorInput]}
                            placeholderTextColor="#91C9BF" value={lastName.value}
                            placeholder="Entre com o seu sobrenome" onChangeText={lastName.setValue}
                            onBlur={() => lastName.validate()}/>
                    </View>

                    <ImageLoader onImageSelected={handleAvatarSelect}
                                 textInput={"Selecionar foto de perfil"}
                                 switchButtonText={"Mudar Foto"}
                                 actionField={"Foto de Perfil (Opcional)"}/>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Email</Text>
                        <TextInput
                            style={[!email.isTouched || email.isValid ? _styles.textInput : _styles.errorInput]}
                            placeholderTextColor="#91C9BF" value={email.value}
                            placeholder="Entre com o seu Email" onChangeText={email.setValue}
                            onBlur={() => email.validate()}/>
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Telefone (Ex: 99 99999-9999)</Text>
                        <TextInput
                            style={[!phone.isTouched || phone.isValid ? _styles.textInput : _styles.errorInput]}
                            placeholderTextColor="#91C9BF" value={phone.value}
                            placeholder="Seu número de telefone" keyboardType="phone-pad"
                            onBlur={() => phone.validate()}
                            onChangeText={phone.setValue}/>
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>CPF</Text>
                        <TextInput
                            style={[!cpf.isTouched || cpf.isValid ? _styles.textInput : _styles.errorInput]}
                            placeholderTextColor="#91C9BF" value={cpf.value}
                            placeholder="Seu número de CPF" keyboardType="numeric" onChangeText={cpf.setValue}
                            onBlur={() => cpf.validate()}/>
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Senha</Text>
                        <TextInput
                            style={[!password.isTouched || password.isValid ? _styles.textInput : _styles.errorInput]}
                            placeholderTextColor="#91C9BF" value={password.value}
                            onBlur={() => password.validate()}
                            placeholder="Entre com sua senha" onChangeText={password.setValue}
                        />
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Confirme sua senha</Text>
                        <TextInput
                            style={[!confirmPassword.isTouched || confirmPassword.isValid ? _styles.textInput : _styles.errorInput]}
                            placeholderTextColor="#91C9BF"
                            value={confirmPassword.value}
                            onBlur={() => confirmPassword.validate()}
                            placeholder="Confirme a sua senha" onChangeText={confirmPassword.setValue}
                        />
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={[_styles.createAccountBtn, isDisable() && _styles.createAccountBtnDisabled]}
                              disabled={isDisable()}
                              onPress={() => saveUser()}>
                {!isPending
                    ? <Text style={[_styles.createAccountText, isDisable() && _styles.createAccountTextDisabled]}>
                        Criar conta </Text>
                    : <ActivityIndicator style={{alignItems: "center", justifyContent: "center"}}/>
                }
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    goToLogin()
                }}>
                <Text style={_styles.textRedirectLogin}>Ja possui uma conta? Login</Text>
            </TouchableOpacity>

        </View>

    )
}