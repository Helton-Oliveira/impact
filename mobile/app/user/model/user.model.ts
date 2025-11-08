import {BaseEntity} from "@/app/root/BaseEntity";
import {Role} from "react-native";

export default class User extends BaseEntity {
    public firstName?: string;
    public lastName?: string;
    public cpf?: string;
    public email?: string;
    public phoneNumber?: string;
    public role?: Role;
    public password?: string;
    public resetKey?: string;
    public resetKeyCreatedAt?: number;
    public files?: File[];

}