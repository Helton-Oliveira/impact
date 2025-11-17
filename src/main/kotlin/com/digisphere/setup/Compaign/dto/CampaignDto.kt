package com.digisphere.setup.Compaign.dto

import com.digisphere.setup.config.root.BaseInput
import com.digisphere.setup.config.root.BaseOutput
import com.digisphere.setup.enumerations.Status
import com.digisphere.setup.enumerations.TypeOfDonation
import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonView
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.Instant


@JsonIgnoreProperties(ignoreUnknown = true)
data class CampaignInput(
    @field:NotBlank
    val name: String,

    @field:NotBlank
    val purpose: String,

    @field:NotNull
    var status: Status,

    @field:NotNull
    var expirationTime: Instant,

    @field:NotNull
    var typeOfDonation: TypeOfDonation,

    @field:NotNull
    var file: FileInput?,

    @field:NotNull
    var user: UserInput?,
) : BaseInput()

@JsonIgnoreProperties(ignoreUnknown = true)
data class CampaignOutput(

    @field:JsonView(Json.List::class)
    val name: String,

    @field:JsonView(Json.Detail::class)
    val purpose: String,

    @field:JsonView(Json.List::class)
    var status: Status,

    @field:JsonView(Json.Detail::class)
    var expirationTime: Instant,

    @field:JsonView(Json.Detail::class)
    var typeOfDonation: TypeOfDonation,

    @field:JsonView(Json.WithFile::class)
    var file: FileOutput?,

    @field:JsonView(Json.WithUser::class)
    var user: UserOutput?,

    ) : BaseOutput() {

    interface Json {
        interface List;
        interface Detail : List;
        interface WithUser : UserOutput.Json.Detail;
        interface WithFile : FileOutput.Json.Detail;
        interface All : Detail, List, WithUser;
    }
}