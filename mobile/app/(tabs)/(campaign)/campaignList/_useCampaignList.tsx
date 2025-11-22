import _useCampaignQuery from "@/shared/queries/campaign.query";
import useFormBuilder from "@/shared/components/formBuilderComponent";
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
        campaigns: getAll.data?.content,
        isLoading: getAll.isLoading,
        isError: getAll.isError,
        isSuccess: getAll.isSuccess,
        openCreateCampaignScreen,
    }
}