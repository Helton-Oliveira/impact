import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {_useHome} from "@/app/(tabs)/home/_useHome";
import Ionicons from "@expo/vector-icons/Ionicons";
import {CampaignCard} from "@/app/(tabs)/(campaign)/campaignList";

export default function HomeScreen() {
    const {campaigns, isLoadingCampaigns, isErrorCampaigns, isSuccessCampaigns, imageUri} = _useHome();
    return (
        <SafeAreaView className="flex-1 bg-background-primary p-8">
            <View className="w-[100%] h-[8%] flex-row justify-around items-center">
                <Image className="rounded-full justify-start w-[15%] h-[90%]"
                       source={{uri: imageUri}}/>
                <Text className="text-text-default font-bold left-[-15] text-lg">Bem vindo de volta nome!</Text>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={28} color="#FFFF"/>
                </TouchableOpacity>
            </View>

            <View>
                <View className="top-10 flex-row justify-between items-center">
                    <Text className="font-bold text-text-default text-3xl">Novas Campanhas</Text>
                    <TouchableOpacity>
                        <Text className=" text-text-secondary ">Ver mais...</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={campaigns}
                    keyExtractor={item => item.id?.toString() || "1"}
                    renderItem={({item}) => <CampaignCard item={item}/>}
                    horizontal={true}
                />
            </View>


        </SafeAreaView>
    );
}