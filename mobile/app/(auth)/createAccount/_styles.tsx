import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12211F",
        alignItems: "center",
        padding: 15,
    },
    scrollableAre: {
        flex: 1,
        width: "100%",
    },
    formSection: {
        paddingBottom: 20,
        gap: 20
    },
    inputSection: {
        gap: 10,
        alignItems: "flex-start",
    },
    textInput: {
        width: 354,
        height: 55,
        backgroundColor: "#244742",
        borderRadius: 10,
        paddingLeft: 10
    },
    errorInput: {
        width: 354,
        height: 55,
        backgroundColor: "#244742",
        borderWidth: 0.6,
        borderColor: "#ff4d4f",
        borderRadius: 10,
        paddingLeft: 10
    },
    titleInput: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FFF"
    },
    createAccountBtn: {
        backgroundColor: "#12EDC7",
        width: 360,
        height: 55,
        borderRadius: 10,
        justifyContent: "center",
        marginBottom: 20
    },
    createAccountBtnDisabled: {
        backgroundColor: "#12EDC750",
    },
    createAccountText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
    },
    createAccountTextDisabled: {
        color: 'rgba(0,0,0,0.3)'
    },
    textRedirectLogin: {
        color: "#91C9BF",
        fontSize: 16,
        textDecorationLine: "underline",
        marginBottom: 80
    },

})

export default styles;