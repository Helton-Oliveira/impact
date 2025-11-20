import {Stack} from "expo-router";


export default function CampaignLayout() {

    return (
        <Stack initialRouteName="campaignList/index">
            <Stack.Screen name="campaignList/index" options={{
                headerShown: false
            }}/>
            <Stack.Screen name="campaignDetail/index" options={{
                headerShown: false
            }}/>
            <Stack.Screen name="campaignUpdate/index" options={{
                headerTitle: "Criar Campanha",
                headerTitleAlign: "center",
                headerTintColor: "#FFF",
                headerStyle: {
                    backgroundColor: "#12211F"
                },
                headerBackTitle: "",
                contentStyle: {
                    backgroundColor: "#12211F",
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: "#FFF",
                    fontSize: 25
                },
            }}/>
        </Stack>
    );
}