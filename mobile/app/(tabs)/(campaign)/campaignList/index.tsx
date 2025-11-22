import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Campaign from "@/modules/campaign/campaign.model";
import {_useCampaignList} from "@/app/(tabs)/(campaign)/campaignList/_useCampaignList";

export type CampaignCardProps = {
    item: Campaign;
}

export const CampaignCard = ({item}: CampaignCardProps) => {
    return (
        <TouchableOpacity className="flex-1 bg-background-secondary text-text-default rounded-xl  w-80">
            <Image
                className="rounded-lg w-full h-40"
                resizeMode="cover"
                source={{uri: `data:image/jpeg;base64,${item?.file?.base64}`}}
            />
            <Text className="text-text-default">{item.name}</Text>
            <Text className="text-text-default">{item.purpose}</Text>
        </TouchableOpacity>
    );
}

export default function CampaignListScreen() {
    const {campaigns, isLoading, openCreateCampaignScreen} = _useCampaignList();

    if (isLoading) {
        return (
            <ActivityIndicator className="items-center justify-center" size={32}/>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-background-primary p-10 gap-14 justify-center">
            <View
                className="flex-row justify-between bg-background-secondary pr-10 pl-3 items-center rounded-xl w-[100%]">
                <TouchableOpacity>
                    <Ionicons name="search" size={28} color="#91C9BF"/>
                </TouchableOpacity>
                <TextInput className="flex-1 text-text-default"/>
            </View>

            <FlatList
                data={campaigns}
                keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
                renderItem={({item}) => <CampaignCard item={item}/>}
                ListEmptyComponent={<Text className="text-text-default">Nenhuma campanha encontrada.</Text>}
                contentContainerStyle={{gap: 8, paddingBottom: 16}}
                className="flex-1 w-full"
            />

            <TouchableOpacity
                onPress={openCreateCampaignScreen}
                className="absolute bottom-6 right-6 w-16 h-16 bg-teal-600 rounded-2xl items-center justify-center shadow-lg z-50"
            >
                <Ionicons name="add" size={32} color="#FFFF"/>
            </TouchableOpacity>


        </SafeAreaView>
    );
}