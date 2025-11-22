import {Stack} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "../styles/global.css";
import {ThemeProvider} from "@/shared/utils/themeProvider";
import ReactQueryDebugPanel from "@/shared/components/reactQueryDeubgPainel";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Stack>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                </Stack>

                {__DEV__ && <ReactQueryDebugPanel/>}
            </ThemeProvider>
        </QueryClientProvider>

    );
}