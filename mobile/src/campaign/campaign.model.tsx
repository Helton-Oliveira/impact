import {BaseEntity} from "@/src/root/BaseEntity";
import User from "@/src/user/user.model";
import AppFile from "@/src/file/file.mode";
import {Status} from "@/src/enumerations/status";
import {TypeOfDonation} from "@/src/enumerations/typeOfDonation";

export default class Campaign extends BaseEntity {
    public name?: String;
    public purpose?: String;
    public expirationTime?: Date;
    public status?: Status;
    public typeOfDonation?: TypeOfDonation;
    public file?: AppFile;
    public user?: User;
}