import _useCampaignQuery from "@/shared/queries/campaign.query";
import useFormBuilder from "@/shared/components/formBuilderComponent";
import Campaign from "@/modules/campaign/campaign.model";
import {v4 as uuidv4} from 'uuid';
import {Status} from "@/modules/enumerations/status";
import AppFile from "@/modules/file/file.mode";
import {FileType} from "@/modules/file/file.type.enum";
import * as ImagePicker from "expo-image-picker";
import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useRef} from "react";
import _useLoginQuery from "@/app/(auth)/login/_login.query";

type ExpoAsset = ImagePicker.ImagePickerAsset;

export const _useCampaignUpdate = () => {

    const campaignRef = useRef<Campaign | null>(null);
    let file: AppFile;
    const {create, update, getById} = _useCampaignQuery();

    const {form} = useFormBuilder({
        name: {
            initial: "",
            validate: (v) => !v || v.length === 0 ? "Nome da campanha é obrigatório" : null
        },
        purpose: {
            initial: "",
            validate: (v) => !v || v.length === 0 ? "Propósito da campanha é obrigatório" : null
        },
        uriImage: {
            initial: null as ExpoAsset | null,
            validate: (v) => !v ? "Imagem da campanha é obrigatório" : null
        },
        allowMoneyDonation: {
            initial: false,
            validate: (v) => null
        },
        allowItemDonation: {
            initial: false,
            validate: (v) => null
        }
    });

    /* Bloco de inicializcao */
    const {id} = useLocalSearchParams();
    const isEditing = !!id;
    const {data: data, isLoading, isSuccess, isError} = getById(Number(id), {enabled: isEditing});
    const {getCurrentUser} = _useLoginQuery();
    const {data: user} = getCurrentUser();

    useEffect(() => {
        if (data) {
            campaignRef.current = data;
            updateForm();
        }
    }, [data]);

    /* ================= */

    function updateForm() {
        form.name.setValue(campaignRef.current?.name!);
        form.purpose.setValue(campaignRef.current?.purpose!);
        form.uriImage.setValue({
            uri: campaignRef.current?.file?.name! ?? "",
            fileName: campaignRef?.current?.file?.name! ?? "unknown",
        } as ExpoAsset);
    }

    async function updateCampaign() {
        await updateFile();
        campaignRef.current = {
            uuid: uuidv4(),
            name: form.name.value,
            purpose: form.purpose.value,
            status: Status.PENDING_VERIFICATION,
            allowMoneyDonation: form.allowMoneyDonation.value,
            allowItemDonation: form.allowItemDonation.value,
            file: file,
            user: user,
            expirationTime: undefined,
            active: true,
            _edited: true
        } as Campaign

        console.warn(file)
    }

    async function updateFile() {
        console.log(form.uriImage?.value?.fileName)
        file = new AppFile();
        file.name = form.uriImage?.value?.fileName ?? "";
        file.path = form.uriImage?.value?.fileName ?? "";
        file.type = FileType.IMG;
        file.active = true;
        file._edited = true;

        await file.convertToBase64(form.uriImage?.value?.uri);
    }

    async function onSave() {
        const existisId = campaignRef.current?.id != null
        switch (existisId) {
            case false:
                await updateCampaign();
                await create.mutateAsync(campaignRef.current!)
                    .then(user => {
                        if (user.id) router.push("/campaignList")
                    })
                break;
            case true:
                await updateCampaign();
                await update.mutateAsync(campaignRef.current!)
                    .then(user => {
                        if (user.id) router.push("/campaignList")
                    })
                break;
        }
    }

    function canSubmit(): boolean {
        const formIsValid = [form.name, form.purpose, form.uriImage].every(f => f.isValid);
        const isAnyFieldTouched = Object.values(form).some(f => f.isTouched);
        const hasSelectedDonationType = form.allowMoneyDonation.value || form.allowItemDonation.value

        return formIsValid && isAnyFieldTouched && hasSelectedDonationType;
    }

    function dismiss() {
        Object.values(form).forEach(f => f.reset());
    }

    return {
        ...form,
        onSave,
        canSubmit,
        dismiss,
        isLoading,
        isSuccess,
        isError,
        isPendingUpdate: update.isPending,
        isPendingCreate: create.isPending,
    };

}