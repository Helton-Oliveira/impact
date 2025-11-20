import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import CampaignService from "@/src/campaign/campaign.service";
import Campaign from "@/src/campaign/campaign.model";

const service = new CampaignService();

export default function _useCampaignQuery() {
    const queryClient = useQueryClient();

    const campaignFindAll = useQuery({
        queryKey: ["campaigns"],
        queryFn: () => service.findAll(),
    });

    const campaignFindById = (id: number) => {
        return useQuery({
            queryKey: ["campaignById", id],
            queryFn: () => service.finById(id),
            enabled: !!id,
        });
    }

    const createCampaign = useMutation({
        mutationFn: (data: Campaign) => service.create(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["campaigns"]});
        }
    });

    const updateCampaign = useMutation({
        mutationFn: ({data}: { data: Campaign }) =>
            service.updateCampaign(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["campaignById", "campaigns"]});
        }
    });

    const deleteCampaign = useMutation({
        mutationFn: (id: number) => service.delete(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["campaigns"]});
        }
    });


    return {
        campaignFindAll,
        campaignFindById,
        createCampaign,
        updateCampaign,
        deleteCampaign,
    };
}