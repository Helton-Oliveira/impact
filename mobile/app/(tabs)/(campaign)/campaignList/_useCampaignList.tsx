import _useCampaignQuery from "@/shared/queries/campaign.query";
import useFormBuilder from "@/shared/components/formBuilderComponent";
import {router} from "expo-router";
import {useMemo} from "react";

export const _useCampaignList = () => {
    const {getAll} = _useCampaignQuery();

    const form = useFormBuilder({
        visible: {
            initial: false,
        }
    });

    const campaigns = useMemo(() => {
        return getAll.data?.pages.flatMap(page => page.content) || [];
    }, [getAll.data]);

    function openCreateCampaignScreen() {
        router.replace("/campaignUpdate");
    }

    return {
        campaigns,
        isLoading: getAll.isLoading,
        isError: getAll.isError,
        isSuccess: getAll.isSuccess,
        openCreateCampaignScreen,
    }
}