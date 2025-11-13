import {FileType} from "@/src/file/file.type.enum";
import User from "@/src/user/user.model";
import {BaseEntity} from "@/src/root/BaseEntity";
import {readAsStringAsync} from 'expo-file-system/legacy';

export default class AppFile extends BaseEntity {
    public name?: string;
    public path?: string;
    public base64?: string;
    public type?: FileType;
    public user?: User;

    async convertToBase64(uri?: string): Promise<void> {
        if (uri === null || uri === undefined) return;
        this.base64 = await readAsStringAsync(uri, {
            encoding: "base64",
        });
    }
}
