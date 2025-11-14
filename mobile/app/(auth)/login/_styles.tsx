import {StyleSheet} from "react-native";

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12211F",
        alignItems: "center",
        justifyContent: "center",
    },
    container1: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30
    },
    inputSection: {
        display: "flex",
        gap: 30,
        alignItems: "center"
    },
    welcomeText: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "bold",
    },
    textInput: {
        paddingLeft: 10,
        width: 360,
        height: 55,
        borderRadius: 10,
        backgroundColor: "#244742",
        color: "#FFFFFF"
    },
    loginBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 360,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#12EDC7"
    },
    textBtnLogin: {
        fontSize: 20,
        fontWeight: "bold",
    },
    forgotPassBtn: {
        color: "#91C9BF",
        fontSize: 15,
    },
    forgotPassSection: {
        marginBottom: 260
    },
    createAccountBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#244742",
        width: 200,
        height: 45,
        borderRadius: 10
    },
    textCreateAccountBtn: {
        fontWeight: "bold",
        color: "#FFF",
        fontSize: 18
    },
    errorTextInput: {
        paddingLeft: 10,
        width: 360,
        height: 55,
        borderRadius: 10,
        backgroundColor: "#244742",
        borderWidth: 0.6,
        borderColor: "#ff4d4f",
        color: "#FFFFFF"
    },
    loginBtnDisabled: {
        backgroundColor: "#12EDC750",
    },
    loginTextDisabled: {
        color: 'rgba(0,0,0,0.3)'
    },
});

export default _styles;