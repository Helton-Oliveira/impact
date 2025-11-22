import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import CampaignService from "@/modules/campaign/campaign.service";
import Campaign from "@/modules/campaign/campaign.model";

const service = new CampaignService();

export default function _useCampaignQuery() {
    const queryClient = useQueryClient();
    const ITEMS_PER_PAGE = 10;

    const getAll = useInfiniteQuery({
        queryKey: ["campaigns"],
        initialPageParam: 0,
        getNextPageParam: () => {
            return 1
        },
        queryFn: ({pageParam}) => service.findAll(pageParam, ITEMS_PER_PAGE),
    });

    const getById = (id: number, options?: { enabled: boolean }) => {
        return useQuery({
            queryKey: ["campaign", id],
            queryFn: () => service.finById(id),
            ...options
        });
    }

    const create = useMutation({
        mutationFn: (data: Campaign) => service.create(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["campaigns"]});
        },
        onError: error => console.log("Erro na Atualização:", error)
    });

    const update = useMutation({
        mutationFn: (data: Campaign) =>
            service.update(data),
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
        getAll,
        getById,
        create,
        update,
        deleteCampaign,
    };
}