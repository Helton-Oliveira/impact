import _useCampaignQuery from "@/queries/campaign.query";
import useFormBuilder from "@/components/formBuilderComponent";

export const _useCampaignUpdate = () => {

    const {createCampaign, updateCampaign} = _useCampaignQuery();

    const form = useFormBuilder({});

    async function saveCampaign() {

    }


    return {
        ...form
    };

}