import AsyncStorage from "@react-native-async-storage/async-storage";

let accessTokenMemory: string | null = null;
let refreshTokenMemory: string | null = null;
let tokensInitialized = false;

export async function loadTokensFromStorage() {
    const [access, refresh] = await Promise.all([
        AsyncStorage.getItem('accessToken'),
        AsyncStorage.getItem('refreshToken'),
    ]);

    accessTokenMemory = access;
    refreshTokenMemory = refresh;

    return {access, refresh};
}

export function getAccessToken(): string | null {
    return accessTokenMemory;
}

export function getRefreshToken(): string | null {
    return refreshTokenMemory;
}

export async function setAccessToken(token: string) {
    accessTokenMemory = token;
    await AsyncStorage.setItem('accessToken', token);
}

export async function setRefreshToken(token: string) {
    refreshTokenMemory = token;
    await AsyncStorage.setItem('refreshToken', token);
}

export async function clearSession() {
    accessTokenMemory = null;
    refreshTokenMemory = null;

    await Promise.all([
        AsyncStorage.removeItem('accessToken'),
        AsyncStorage.removeItem('refreshToken'),
    ]);
}


export const ensureTokensLoaded = async () => {
    if (!tokensInitialized) {
        await loadTokensFromStorage();
        tokensInitialized = true;
    }
};
