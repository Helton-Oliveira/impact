import {SafeAreaView} from "react-native-safe-area-context";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import ImageLoader from "@/shared/components/imageLoader";
import {_useCampaignUpdate} from "@/app/(tabs)/(campaign)/campaignUpdate/_useCampaignUpdate";

export default function CampaignUpdate() {

    const {
        name,
        purpose,
        allowMoneyDonation,
        allowItemDonation,
        uriImage,
        onSave,
        dismiss,
        canSubmit,
        isPendingCreate,
        isPendingUpdate,
    } = _useCampaignUpdate();

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
        <SafeAreaView className="flex-1 bg-background-primary">

            {/* 2. Área ROLÁVEL e com Evitamento de Teclado (Ocupa o espaço restante) */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 20}}>
                    {/* Conteúdo do Formulário (Centralizado) */}
                    <View className="gap-5 items-center justify-center p-4">

                        <TextInput
                            className="bg-background-secondary w-full max-w-sm h-16 rounded-xl pl-5 text-text-default"
                            placeholder="Titulo da Campanha..."
                            placeholderTextColor="#7EE3D4"
                            value={name.value}
                            onChangeText={name.setValue}
                        />

                        <TextInput
                            className="bg-background-secondary w-full max-w-sm h-40 rounded-xl pl-5 text-text-default"
                            placeholder="Descrição..."
                            placeholderTextColor="#7EE3D4"
                            value={purpose.value}
                            onChangeText={purpose.setValue}
                            multiline
                            textAlignVertical="top"
                        />

                        {/* Conteúdo dentro do ScrollView: ImageLoader e Tipos de Doação */}
                        <View className="items-start w-full p-2 gap-2">

                            <ImageLoader
                                onImageSelected={uriImage.setValue}
                                textInput={"Carregar Imagem"}
                                switchButtonText={"Trocar Imagem"}
                                actionField={"Carregar Imagem"}
                            />

                            <Text className="font-bold text-2xl text-text-default pt-5">
                                Tipo de campanha
                            </Text>

                            <View className="flex-row w-full gap-5">
                                <FilterButton
                                    label="Money"
                                    isActive={allowMoneyDonation.value}
                                    onPress={() => allowMoneyDonation.setValue(!allowMoneyDonation.value)}
                                />

                                <FilterButton
                                    label="Items"
                                    isActive={allowItemDonation.value}
                                    onPress={() => allowItemDonation.setValue(!allowItemDonation.value)}
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* 3. Área FIXA dos Botões (FORA do ScrollView) */}
            <View className="flex-row p-4 justify-between bg-background-primary">

                {/* Botão Cancelar */}
                <TouchableOpacity
                    className="flex-1 h-14 bg-background-secondary rounded-xl justify-center items-center mr-2"
                    onPress={() => dismiss()}>
                    <Text className="text-text-default text-xl font-bold">Cancelar</Text>
                </TouchableOpacity>

                {/* Botão Salvar Campanha */}
                <TouchableOpacity
                    className={`flex-1 h-14 rounded-xl justify-center items-center ml-2 
                    ${canSubmit() ? "bg-accent-primary" : "bg-state-disabled"}`}
                    disabled={!canSubmit()}
                    onPress={onSave}>

                    {(isPendingCreate || isPendingUpdate) ? (
                        <ActivityIndicator className="color-text-default justify-center items-center" size="small"/>
                    ) : (
                        <Text className={
                            ` text-2xl font-bold text-text-default
                            ${!canSubmit() && "color-text-disabled"}`}>Salvar Campanha</Text>
                    )}
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}