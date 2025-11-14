import {Stack} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ReactQueryDebugPanel from "@/app/components/reactQueryDeubgPainel";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            </Stack>

            {__DEV__ && <ReactQueryDebugPanel/>}
        </QueryClientProvider>
    );
}