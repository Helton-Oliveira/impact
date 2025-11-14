import {Stack} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            </Stack>

            {__DEV__ && (
                <ReactQueryDevtools initialIsOpen={false}/>
            )}
        </QueryClientProvider>
    );
}