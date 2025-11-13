import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
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
        createUser,
    } = useCreateAccount();

    return (
        <View style={_styles.container}>
            <ScrollView style={_styles.scrollableAre}>
                <View style={_styles.formSection}>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Nome</Text>
                        <TextInput style={_styles.textInput} placeholderTextColor="#91C9BF" value={firstName.value}
                                   placeholder="Entre com o seu nome" onChangeText={firstName.setValue}
                        />
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Sobrenome</Text>
                        <TextInput style={_styles.textInput} placeholderTextColor="#91C9BF" value={lastName.value}
                                   placeholder="Entre com o seu sobrenome" onChangeText={lastName.setValue}
                        />
                    </View>

                    <ImageLoader onImageSelected={handleAvatarSelect}
                                 textInput={"Selecionar foto de perfil"}
                                 switchButtonText={"Mudar Foto"}
                                 actionField={"Foto de Perfil (Opcional)"}/>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Email</Text>
                        <TextInput style={_styles.textInput} placeholderTextColor="#91C9BF" value={email.value}
                                   placeholder="Entre com o seu Email" onChangeText={email.setValue}
                        />
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Telefone (Ex: 99 99999-9999)</Text>
                        <TextInput style={_styles.textInput} placeholderTextColor="#91C9BF" value={phone.value}
                                   placeholder="Seu número de telefone" keyboardType="phone-pad"
                                   onChangeText={phone.setValue}/>
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>CPF</Text>
                        <TextInput style={_styles.textInput} placeholderTextColor="#91C9BF" value={cpf.value}
                                   placeholder="Seu número de CPF" keyboardType="numeric" onChangeText={cpf.setValue}/>
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Senha</Text>
                        <TextInput style={_styles.textInput} placeholderTextColor="#91C9BF" value={password.value}
                                   placeholder="Entre com sua senha" onChangeText={password.setValue}
                        />
                    </View>

                    <View style={_styles.inputSection}>
                        <Text style={_styles.titleInput}>Confirme sua senha</Text>
                        <TextInput style={_styles.textInput} placeholderTextColor="#91C9BF"
                                   value={confirmPassword.value}
                                   placeholder="Confirme a sua senha" onChangeText={confirmPassword.setValue}
                        />
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={_styles.createAccountBtn} onPress={() => createUser()}>
                <Text style={_styles.createAccountText}>
                    Criar conta
                </Text>
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