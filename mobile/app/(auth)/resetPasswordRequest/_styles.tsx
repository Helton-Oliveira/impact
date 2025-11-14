import {StyleSheet} from "react-native";

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12211F",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 160,
        padding: 10
    },
    card: {
        width: "100%",
        backgroundColor: "#244742",
        borderRadius: 15,
        alignItems: "center",
        padding: 10,
        gap: 30,
        alignSelf: "stretch"
    },
    title: {
        color: "#FFF",
        fontSize: 37,
        fontWeight: "bold",
        textAlign: "center"
    },
    subtitle: {
        color: "#FFF",
        fontSize: 18,
        textAlign: "center"
    },
    btn: {
        width: "100%",
        height: "12%",
        borderRadius: 10,
        backgroundColor: "#12EDC7",
        justifyContent: "center"
    },
    textInput: {
        width: "100%",
        height: "12%",
        backgroundColor: "#91C9BF",
        borderRadius: 10,
        paddingLeft: 15
    },
    footerText: {
        color: "#FFF",
        fontSize: 15,
        textAlign: "center"
    },
    textBtn: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    confirmMessageCard: {
        width: "100%",
        height: "9%",
        backgroundColor: "#d1e7dd",
        borderRadius: 10,
        justifyContent: "center",
        borderColor: "#198754",
        borderWidth: 2,
        display: "flex"
    },
    confirmMessageText: {
        color: "#146c43",
        textAlign: "center"
    },
    confirmMessageCardError: {
        width: "100%",
        height: "9%",
        backgroundColor: "#f8d7da",
        borderRadius: 10,
        justifyContent: "center",
        borderColor: "#dc3545",
        borderWidth: 2,
        display: "flex"
    },
    confirmMessageTextError: {
        color: "#b02a37",
        textAlign: "center"
    },
})

export default _styles;