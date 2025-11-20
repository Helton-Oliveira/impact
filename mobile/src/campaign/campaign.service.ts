import axios from "axios";
import Campaign from "@/src/campaign/campaign.model";

type EntityResponseType = Campaign;
type EntityArrayResponseType = Campaign[];

export default class CampaignService {
    private readonly BASE_URL: string = "http://192.168.15.99:8080/api/campaigns";

    async create(campaign: Campaign): Promise<EntityResponseType> {
        return axios.post(`${this.BASE_URL}`, campaign)
            .then(res => res.data);
    }

    async findAll(): Promise<EntityArrayResponseType> {
        return axios.get(`${this.BASE_URL}`)
            .then(res => res.data);
    }

    async finById(id: number): Promise<EntityResponseType> {
        return axios.get(`${this.BASE_URL}/${id}`)
            .then(res => res.data);
    }

    async update(campaign: Campaign): Promise<EntityResponseType> {
        return axios.put(`${this.BASE_URL}`, campaign)
            .then(res => res.data);
    }

    async delete(id: number): Promise<EntityResponseType> {
        return axios.delete(`${this.BASE_URL}/${id}`)
            .then(res => res.data);
    }
}