package com.digisphere.setup.Compaign.repository

import com.digisphere.setup.Compaign.domain.Campaign
import org.springframework.data.jpa.repository.JpaRepository

interface CampaignRepository : JpaRepository<Campaign, Long> {
}