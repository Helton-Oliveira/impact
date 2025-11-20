import _useCampaignQuery from "@/queries/campaign.query";
import useFormBuilder from "@/components/formBuilderComponent";
import {router} from "expo-router";

export const _useCampaignList = () => {
    const {getAll} = _useCampaignQuery();

    const form = useFormBuilder({
        visible: {
            initial: false,
        }
    });

    function openCreateCampaignScreen() {
        router.replace("/campaignUpdate");
    }

    return {
        campaigns: getAll.data || [],
        isLoading: getAll.isLoading,
        isError: getAll.isError,
        isSuccess: getAll.isSuccess,
        openCreateCampaignScreen
    }
}