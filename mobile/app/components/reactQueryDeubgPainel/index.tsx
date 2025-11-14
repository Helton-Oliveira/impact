import {Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";

export default function ReactQueryDebugPanel() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [queries, setQueries] = useState(queryClient.getQueryCache().getAll());

    const slideAnim = useRef(new Animated.Value(100)).current; // começa fora da tela
    const fadeAnim = useRef(new Animated.Value(0)).current;

    function refresh() {
        setQueries([...queryClient.getQueryCache().getAll()]);
    }

    function clearCache() {
        queryClient.clear();
        refresh();
    }

    useEffect(() => {
        if (open) {
            refresh();

            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 100,
                    duration: 200,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                })
            ]).start();
        }
    }, [open]);

    if (!open) {
        return (
            <TouchableOpacity style={styles.floatingButton} onPress={() => setOpen(true)}>
                <Text style={styles.buttonText}>RQ</Text>
            </TouchableOpacity>
        );
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{translateY: slideAnim}]
                }
            ]}
        >
            {/* Botão fechar */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.title}>React Query Debug</Text>

            {/* Botões úteis */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={refresh} style={styles.actionBtn}>
                    <Text style={styles.actionText}>Refresh</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={clearCache} style={[styles.actionBtn, {backgroundColor: "#ff5555"}]}>
                    <Text style={styles.actionText}>Clear Cache</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{maxHeight: 220}}>
                {queries.map((q) => {
                    const statusColor =
                        q.state.status === "success" ? "#4caf50" :
                            q.state.status === "error" ? "#ff4444" :
                                q.state.status === "pending" ? "#f1c40f" :
                                    "#95a5a6";

                    return (
                        <View key={q.queryHash} style={styles.item}>
                            <Text style={[styles.key, {color: statusColor}]}>
                                • {JSON.stringify(q.queryKey)}
                            </Text>

                            <Text style={styles.status}>status: {q.state.status}</Text>

                            <Text style={styles.updatedAt}>
                                updatedAt: {new Date(q.state.dataUpdatedAt).toLocaleTimeString()}
                            </Text>

                            {/* Mostra erro */}
                            {q.state.error && (
                                <Text style={styles.errorText}>
                                    error: {String(q.state.error)}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        padding: 10,
        paddingTop: 35,
        zIndex: 9999,
        borderTopWidth: 1,
        borderTopColor: "#00eaff33",
    },

    floatingButton: {
        position: "absolute",
        right: 20,
        bottom: 40,
        backgroundColor: "#00eaff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 30,
        zIndex: 99999,
        elevation: 5,
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 13,
    },

    closeButton: {
        position: "absolute",
        right: 10,
        top: 5,
        backgroundColor: "#00eaff",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
    },
    closeText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 12,
    },

    title: {
        color: "#00eaff",
        fontWeight: "bold",
        fontSize: 13,
        marginBottom: 8,
        marginLeft: 4,
    },

    actions: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 10,
    },
    actionBtn: {
        backgroundColor: "#00aaff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    actionText: {
        color: "#fff",
        fontSize: 11,
    },

    item: {
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255,255,255,0.15)",
    },
    key: {
        fontSize: 11,
        marginBottom: 2,
    },
    status: {
        color: "#ccc",
        fontSize: 10,
    },
    updatedAt: {
        color: "#aaa",
        fontSize: 9,
    },
    errorText: {
        color: "#ff7777",
        fontSize: 10,
        marginTop: 2,
    },
});
