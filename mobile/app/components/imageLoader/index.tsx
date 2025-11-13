import {Image, Text, TouchableOpacity, View} from "react-native";
import _styles from "@/app/components/imageLoader/_styles";
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
        <View style={_styles.avatarSection}>

            <Text style={_styles.titleInput}>{actionField}</Text>

            {selectedImage ? (
                <View style={_styles.avatarContainer}>
                    <Image source={{uri: selectedImage?.uri}} style={_styles.avatarImage}/>
                    <TouchableOpacity style={_styles.changeAvatarBtn} onPress={handleImageSelection}>
                        <Text style={_styles.avatarText}>{switchButtonText}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={_styles.avatarBtn}
                                  onPress={handleImageSelection}>
                    <Text style={_styles.avatarText}>{textInput}</Text>
                </TouchableOpacity>
            )}

        </View>
    )
}