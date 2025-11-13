import {BaseEntity} from "@/src/root/BaseEntity";
import {Role} from "@/src/root/Role";
import AppFile from "@/src/file/file.mode";

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
    public files?: AppFile[];

}