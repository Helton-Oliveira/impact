import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Campaign from "@/src/campaign/campaign.model";
import {_useCampaignList} from "@/app/(tabs)/(campaign)/campaignList/_useCampaignList";

export type CampaignCardProps = {
    item: Campaign;
}

export const CampaignCard = ({item}: CampaignCardProps) => {
    return (
        <TouchableOpacity>
            <Image
                className="rounded-lg "
                source={{uri: ""}}
            />
            <Text>{item.name}</Text>
            <Text>{item.purpose}</Text>
        </TouchableOpacity>
    );
}

export default function CampaignListScreen() {
    const {campaigns, openCreateCampaignScreen} = _useCampaignList();

    return (
        <SafeAreaView className="flex-1 bg-background-primary p-10 ">
            <View
                className="flex-row justify-between bg-background-secondary pr-10 pl-3 items-center rounded-xl w-[100%]">
                <TouchableOpacity>
                    <Ionicons name="search" size={28} color="#91C9BF"/>
                </TouchableOpacity>
                <TextInput className=" text-text-default"/>
            </View>

            <View className="justify-center items-center gap-2">
                <FlatList
                    data={campaigns}
                    renderItem={({item}) => <CampaignCard item={item}/>}/>
            </View>

            <TouchableOpacity
                onPress={() => {
                    openCreateCampaignScreen();
                }}
                className="absolute bottom-6 right-6 w-16 h-16 bg-teal-600 rounded-2xl items-center justify-center shadow-lg z-50"
            >
                <Ionicons name="add" size={32} color="#FFFF"/>
            </TouchableOpacity>


        </SafeAreaView>
    );
}