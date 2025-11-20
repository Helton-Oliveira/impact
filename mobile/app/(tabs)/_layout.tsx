import {Tabs} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeLayout() {
    return (
        <Tabs
            initialRouteName="home/index"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#12EDC7",
                tabBarInactiveTintColor: "#12EDC750",
                tabBarStyle: {
                    backgroundColor: "#244742",
                    borderTopWidth: 0,
                    paddingBottom: 5,
                    justifyContent: "space-around"
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >

            <Tabs.Screen name="home/index"
                         options={{
                             title: "Home",
                             tabBarIcon: ({color}) => (
                                 <Ionicons name="home" size={28} color={color}/>
                             )
                         }}/>

            <Tabs.Screen name="(campaign)"
                         options={{
                             title: "Campanha",
                             tabBarIcon: ({color}) => (
                                 <Ionicons name="albums" size={28} color={color}/>
                             )
                         }}/>

        </Tabs>
    );
}