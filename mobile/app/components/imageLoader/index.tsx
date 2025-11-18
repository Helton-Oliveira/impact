import {Image, Text, TouchableOpacity, View} from "react-native";
import _useImageLoader from "@/app/components/imageLoader/_useImageLoader";
import * as ImagePicker from 'expo-image-picker';

interface ImageLoaderProps {
    onImageSelected: (asset: ImagePicker.ImagePickerAsset) => void;
    textInput: string;
    switchButtonText: string;
    actionField: string
}

export default function ImageLoader({onImageSelected, textInput, switchButtonText, actionField}: ImageLoaderProps) {
    const {handleImageSelection, selectedImage} = _useImageLoader(onImageSelected);

    return (
        <View className="gap-[10px] items-start w-[360px]">

            <Text className="font-bold text-[18px] text-text-default">
                {actionField}
            </Text>

            {selectedImage ? (
                <View className="items-center justify-center mt-[10px]">

                    <Image
                        source={{uri: selectedImage?.uri}}
                        className="w-[120px] h-[120px] rounded-full border-[3px] border-background-secondary mb-[10px]"
                    />

                    <TouchableOpacity
                        className="bg-background-secondary py-[8px] px-[15px] rounded-[5px] items-center mt-[5px]"
                        onPress={handleImageSelection}
                    >
                        <Text className="text-background-secondary text-[16px] font-semibold">
                            {switchButtonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    className=" w-[96%] h-[150px] rounded-[10px] bg-background-secondary justify-center items-center border border-background-tertiary "
                    onPress={handleImageSelection}
                >
                    <Text className="text-background-tertiary text-[16px] font-semibold">
                        {textInput}
                    </Text>
                </TouchableOpacity>
            )}

        </View>

    )
}