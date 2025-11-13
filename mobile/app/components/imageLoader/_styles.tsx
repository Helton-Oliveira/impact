import {StyleSheet} from "react-native";

const _styles = StyleSheet.create({

    avatarSection: {
        gap: 10,
        alignItems: "flex-start",
        width: 360,
    },
    avatarBtn: {
        width: '96%',
        height: 150,
        borderRadius: 10,
        backgroundColor: '#244742',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#91C9BF'
    },
    avatarText: {
        color: '#91C9BF',
        fontSize: 16,
        fontWeight: '600'
    },
    titleInput: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FFF"
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#91C9BF',
        marginBottom: 10,
    },
    changeAvatarBtn: {
        backgroundColor: '#244742',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
    },
});

export default _styles;