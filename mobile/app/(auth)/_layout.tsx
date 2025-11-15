import {Stack} from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            initialRouteName="login/index"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#12211F",
                },
                headerTitleAlign: "center",
                headerTintColor: "#FFF",
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: "#FFF",
                    fontSize: 25
                },
                headerBackTitle: "",
                animation: "slide_from_right",
                contentStyle: {
                    backgroundColor: "#12211F",
                },

            }}
        >
            <Stack.Screen name="login/index" options={{headerShown: false}}/>
            <Stack.Screen name="createAccount/index"
                          options={{
                              headerTitle: "Criar Conta",
                          }}
            />
            <Stack.Screen name="resetPasswordRequest/index"
                          options={{
                              headerTitle: "Resetar Senha"
                          }}/>
            <Stack.Screen name="resetPassword/index"
                          options={{
                              headerShown: false
                          }}/>
        </Stack>
    );
}