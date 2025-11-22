package com.digisphere.setup.Compaign.resource

import com.digisphere.setup.Compaign.domain.CampaignAssociations
import com.digisphere.setup.Compaign.dto.CampaignInput
import com.digisphere.setup.Compaign.service.CampaignService
import jakarta.validation.Valid
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.util.UriComponentsBuilder

@RestController
@RequestMapping("api/campaigns")
class CampaignResource(
    private val campaignService: CampaignService
) {

    @PostMapping
    fun create(@RequestBody @Valid input: CampaignInput, uriBuilder: UriComponentsBuilder): ResponseEntity<*> =
        campaignService.save(input)
            .fold(
                onSuccess = {
                    ResponseEntity.created(uriBuilder.path("/api/campaigns/${it?.id}").build().toUri())
                        .body(it)
                },
                onFailure = { err ->
                    err.printStackTrace()
                    ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err.message ?: "Unknown error")
                },
            );

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): ResponseEntity<*> =
        campaignService.getOne(id, setOf(CampaignAssociations.USER, CampaignAssociations.FILE))
            .fold(
                onSuccess = { ResponseEntity.ok(it) },
                onFailure = { err ->
                    err.printStackTrace()
                    ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err.message ?: "Unknown error")
                }
            )

    @GetMapping
    fun getAll(
        @PageableDefault(size = 10, sort = ["createdAt"], direction = Sort.Direction.DESC) pagination: Pageable
    ): ResponseEntity<*> =
        campaignService.getAll(pagination, setOf(CampaignAssociations.FILE))
            .fold(
                onFailure = { err ->
                    err.printStackTrace()
                    ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err.message ?: "Unknown error")
                },
                onSuccess = { ResponseEntity.ok(it) }
            )

    /*
        @DeleteMapping("/{id}")
        fun disabled(@PathVariable id: Long): ResponseEntity<*> =
            campaignService.disableById(id)
                .fold(
                    onFailure = { err ->
                        val status = when (err) {
                            is HttpClientErrorException.Unauthorized -> HttpStatus.UNAUTHORIZED
                            is IllegalArgumentException -> HttpStatus.CONFLICT
                            else -> HttpStatus.INTERNAL_SERVER_ERROR
                        }

                        ResponseEntity.status(status).body(null)
                    },
                    onSuccess = { ResponseEntity.ok(it) }
                ) */
}