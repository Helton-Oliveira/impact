import _useCampaignQuery from "@/queries/campaign.query";

export const _useHome = () => {

    const {campaignFindAll} = _useCampaignQuery();

    return {
        campaigns: campaignFindAll.data || [],
        isLoadingCampaigns: campaignFindAll.isLoading,
        isErrorCampaigns: campaignFindAll.isError,
        isSuccessCampaigns: campaignFindAll.isSuccess,
    }
}