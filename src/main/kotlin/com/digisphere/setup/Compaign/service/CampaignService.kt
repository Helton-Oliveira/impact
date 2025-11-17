package com.digisphere.setup.Compaign.service

import com.digisphere.setup.Compaign.domain.CampaignAssociations
import com.digisphere.setup.Compaign.dto.CampaignInput
import com.digisphere.setup.Compaign.dto.CampaignOutput
import com.digisphere.setup.Compaign.extensions.toDomain
import com.digisphere.setup.Compaign.extensions.toOutput
import com.digisphere.setup.Compaign.repository.CampaignRepository
import com.digisphere.setup.config.root.extensions.applyFetches
import com.digisphere.setup.file.service.FileService
import jakarta.transaction.Transactional
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
@Transactional
class CampaignService(
    private val campaignRepository: CampaignRepository,
    private val fileService: FileService,
) {

    fun save(input: CampaignInput?): Result<CampaignOutput?> = runCatching {
        val editedFile = input
            ?.takeIf { it.file?._edited ?: false }
            ?.also { it.file?.user = it.user }
            ?.file

        input?.toDomain()
            ?.takeIf { it.wasEdited() && it.user?.id != null }
            ?.also { fileService.saveFile(editedFile) }
            ?.let(campaignRepository::save)
            ?.toOutput()
    }

    fun getOne(id: Long, fetches: Set<CampaignAssociations> = emptySet()) = runCatching {
        campaignRepository.findById(id)
            .getOrNull()
            ?.also { if (fetches.isNotEmpty()) it.applyFetches(fetches) }
            ?.toOutput()
    }

    fun getAll(pageable: Pageable) = runCatching {
        campaignRepository.findAll(pageable)
            .map { file -> file.toOutput() }
    }

    fun deleteById(id: Long) = runCatching {
        campaignRepository.findById(id)
            .getOrNull()
            ?.also { it.disabled() }
            ?.let { campaignRepository.save(it) }
            ?.toOutput()
    }

}