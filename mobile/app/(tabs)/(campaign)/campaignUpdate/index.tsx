import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import ImageLoader from "@/components/imageLoader";

export default function CampaignUpdate() {

    type FilterButtonProps = {
        label: string;
        isActive: boolean;
        onPress: () => void;
    }

    function FilterButton({label, isActive, onPress}: FilterButtonProps) {
        return (
            <TouchableOpacity
                onPress={onPress}
                className={`
                px-6 py-3 rounded-xl border 
                ${isActive
                    ? "bg-background-secondary border-teal-600"
                    : "bg-transparent border-teal-600"
                }
            `}
            >
                <Text className={`
                font-bold text-text-default
                ${isActive ? "text-white" : "text-teal-100"}
            `}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background-primary items-center justify-center">
            <ScrollView>
                <View className="flex-1 bg-background-primary gap-5">
                    <TextInput className="bg-background-secondary w-96 h-16 rounded-xl pl-5"
                               placeholder="Titulo da Campanha..."
                               placeholderTextColor="#7EE3D4"
                    />

                    <TextInput className="bg-background-secondary w-96 h-40 rounded-xl pl-5"
                               placeholder="Descrição..."
                               placeholderTextColor="#7EE3D4"
                    />

                    <ImageLoader
                        onImageSelected={() => {
                        }}
                        textInput={"Carregar Imagem"}
                        switchButtonText={""}
                        actionField={"Carregar Imagem"}
                    />

                    <View>
                        <Text className="font-bold text-2xl text-text-default items-center p-4 right-4">
                            Tipo de campanha
                        </Text>

                        <View className="flex-row items-center w-80 gap-10">
                            <FilterButton
                                label="Money"
                                isActive={true}
                                onPress={() => {
                                }}
                            />

                            <FilterButton
                                label="Items"
                                isActive={true}
                                onPress={() => {
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="flex-row mt-5 gap-20 mb-[-20]">
                <TouchableOpacity
                    className="w-32 h-14 bg-background-secondary rounded-xl justify-center items-center"
                >
                    <Text className="text-text-default text-xl font-bold">
                        Cancelar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-48 h-14 bg-accent-primary rounded-xl justify-center items-center p-2">
                    <Text className="text-text-default text-xl font-bold">
                        Salvar Campanha
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}