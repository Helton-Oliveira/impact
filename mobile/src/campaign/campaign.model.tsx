import {BaseEntity} from "@/src/root/BaseEntity";
import User from "@/src/user/user.model";
import AppFile from "@/src/file/file.mode";
import {Status} from "@/src/enumerations/status";

export default class Campaign extends BaseEntity {
    public name?: string;
    public purpose?: string;
    public expirationTime?: Date;
    public status?: Status;
    public allowMoneyDonation?: boolean;
    public allowItemDonation?: boolean;
    public file?: AppFile;
    public user?: User;
}