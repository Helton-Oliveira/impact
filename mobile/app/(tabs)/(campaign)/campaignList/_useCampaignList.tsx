import _useCampaignQuery from "@/queries/campaign.query";
import useFormBuilder from "@/components/formBuilderComponent";
import {router} from "expo-router";

export const _useCampaignList = () => {
    const {campaignFindAll} = _useCampaignQuery();

    const form = useFormBuilder({
        visible: {
            initial: false,
        }
    });

    function openCreateCampaignScreen() {
        router.replace("/campaignUpdate");
    }

    return {
        campaigns: campaignFindAll.data || [],
        isLoading: campaignFindAll.isLoading,
        isError: campaignFindAll.isError,
        isSuccess: campaignFindAll.isSuccess,
        openCreateCampaignScreen
    }
}