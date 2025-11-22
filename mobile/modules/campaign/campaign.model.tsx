import {BaseEntity} from "@/modules/root/BaseEntity";
import User from "@/modules/user/user.model";
import AppFile from "@/modules/file/file.mode";
import {Status} from "@/modules/enumerations/status";

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