import Campaign from "@/modules/campaign/campaign.model";
import api from "@/modules/root/api";
import {Page} from "@/shared/api.response";

type EntityResponseType = Campaign;
type EntityArrayResponseType = Page<Campaign>;

export default class CampaignService {

    async create(campaign: Campaign): Promise<EntityResponseType> {
        return api.post(`/campaigns`, campaign)
            .then(res => res.data);
    }

    async findAll(pageParam: number, size: number): Promise<EntityArrayResponseType> {
        const config = {
            params: {
                page: pageParam,
                size: size,
                sort: "id,desc"
            }
        };
        return api.get<EntityArrayResponseType>(`/campaigns`, config)
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