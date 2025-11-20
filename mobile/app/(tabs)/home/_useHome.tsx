import _useCampaignQuery from "@/queries/campaign.query";

export const _useHome = () => {

    const {getAll} = _useCampaignQuery();

    return {
        campaigns: getAll.data || [],
        isLoadingCampaigns: getAll.isLoading,
        isErrorCampaigns: getAll.isError,
        isSuccessCampaigns: getAll.isSuccess,
    }
}