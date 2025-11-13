import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';

type ExpoAsset = ImagePicker.ImagePickerAsset;
type UseImageLoaderProps = (asset: ExpoAsset) => void;

export default function _useImageLoader(onImageSelected: UseImageLoaderProps) {
    const [selectedImage, setSelectedImage] = useState<ExpoAsset | null>(null);

    const handleImageSelection = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            onImageSelected(asset);
            setSelectedImage(asset);
        } else if (result.canceled) {
            console.log('Seleção de imagem cancelada');
        }
    };

    return {
        selectedImage,
        handleImageSelection,
    };
}