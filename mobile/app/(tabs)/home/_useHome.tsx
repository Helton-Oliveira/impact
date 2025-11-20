import _useCampaignQuery from "@/queries/campaign.query";
import _useLoginQuery from "@/app/(auth)/login/_login.query";

export const _useHome = () => {
    const {getCurrentUser} = _useLoginQuery()
    const {getAll} = _useCampaignQuery();

    const {data: user} = getCurrentUser();

    const imageUri = user?.files?.[0]?.path || `data:image/jpeg;base64,${user?.files?.[0]?.base64}`;

    return {
        campaigns: getAll.data || [],
        isLoadingCampaigns: getAll.isLoading,
        isErrorCampaigns: getAll.isError,
        isSuccessCampaigns: getAll.isSuccess,
        user,
        imageUri
    }
}