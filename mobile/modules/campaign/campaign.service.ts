import Campaign from "@/modules/campaign/campaign.model";
import api from "@/modules/root/api";

type PageResponse<T> = {
    content: T[];
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
};

type EntityResponseType = Campaign;
type EntityArrayResponseType = PageResponse<Campaign[]>;

export default class CampaignService {

    async create(campaign: Campaign): Promise<EntityResponseType> {
        return api.post(`/campaigns`, campaign)
            .then(res => res.data);
    }

    async findAll(): Promise<EntityArrayResponseType> {
        return api.get(`/campaigns`)
            .then(res => res.data);
    }

    async finById(id: number): Promise<EntityResponseType> {
        return api.get(`/campaigns`)
            .then(res => res.data);
    }

    async update(campaign: Campaign): Promise<EntityResponseType> {
        return api.put(`/campaigns`, campaign)
            .then(res => res.data);
    }

    async delete(id: number): Promise<EntityResponseType> {
        return api.delete(`/campaigns`)
            .then(res => res.data);
    }
}