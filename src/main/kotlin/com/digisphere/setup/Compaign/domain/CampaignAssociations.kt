package com.digisphere.setup.Compaign.domain

import com.digisphere.setup.config.root.AssociationFetcher

enum class CampaignAssociations(override val propertyName: String) : AssociationFetcher {
    CAMPAIGN_VERIFICATION("campaign_verification"),
    FILE("file"),
    USER("user"),
}