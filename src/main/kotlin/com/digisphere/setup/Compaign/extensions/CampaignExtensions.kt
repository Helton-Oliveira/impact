package com.digisphere.setup.Compaign.extensions

import com.digisphere.setup.Compaign.domain.Campaign
import com.digisphere.setup.Compaign.domain.CampaignAssociations
import com.digisphere.setup.Compaign.dto.CampaignInput
import com.digisphere.setup.Compaign.dto.CampaignOutput
import com.digisphere.setup.config.root.extensions.getAuthenticatedUsername
import com.digisphere.setup.config.root.extensions.mapIfRequested
import com.digisphere.setup.file.extensions.toOutput
import com.digisphere.setup.user.domain.User
import com.digisphere.setup.user.extensions.toOutput

fun CampaignInput.toDomain(): Campaign =
    this.let { input ->
        Campaign().apply {
            name = input.name;
            purpose = input.purpose;
            status = input.status;
            expirationTime = input.expirationTime!!;
            allowMoneyDonation = input.allowMoneyDonation;
            allowItemDonation = input.allowItemDonation;
            user = input.user?.id?.let { userInputId -> User().apply { id = userInputId } }
        }.also { file ->
            file.takeIf { it.wasEdited() }
                ?.audit(getAuthenticatedUsername())
        }
    }

fun Campaign.toOutput(): CampaignOutput =
    CampaignOutput(
        name = this.name,
        purpose = this.purpose,
        status = this.status,
        expirationTime = this.expirationTime,
        allowMoneyDonation = this.allowMoneyDonation,
        allowItemDonation = this.allowItemDonation,
        file = this.mapIfRequested(CampaignAssociations.FILE.propertyName) { this.file.toOutput() },
        user = this.mapIfRequested(CampaignAssociations.USER.propertyName) { this.user?.toOutput() }
    ).also {
        it.id = this.id;
        it.uuid = this.uuid;
        it.active = this.active;
    }
