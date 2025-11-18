import {Tabs} from "expo-router";

export default function HomeLayout() {
    return (
        <Tabs
            initialRouteName="home/index"
            screenOptions={{}}
        >

            <Tabs.Screen name="home/index" options={{headerShown: false}}/>

        </Tabs>
    );
}