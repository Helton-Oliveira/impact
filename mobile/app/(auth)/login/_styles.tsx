import {StyleSheet} from "react-native";

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12211F",
        alignItems: "center",
    },
    container1: {
        flex: 1,
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
    }
});

export default _styles;