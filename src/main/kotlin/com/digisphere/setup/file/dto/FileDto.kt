package com.digisphere.setup.file.dto

import com.digisphere.setup.config.root.BaseInput
import com.digisphere.setup.config.root.BaseOutput
import com.digisphere.setup.file.enum.FileType
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.fasterxml.jackson.annotation.JsonView
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class FileInput(

    @field:NotBlank
    val name: String,

    @field:NotNull
    var type: FileType,

    val path: String? = null,

    val base64: String? = null,

    var user: UserInput? = null,
) : BaseInput()

data class FileOutput(

    @field:JsonView(Json.List::class)
    val name: String,

    @field:JsonView(Json.List::class)
    val type: FileType,

    @field:JsonView(Json.Detail::class)
    val path: String? = null,

    @field:JsonView(Json.Detail::class)
    val base64: String? = null,
) : BaseOutput() {

    interface Json {
        interface List;
        interface Detail : List;
        interface WithUser : UserOutput.Json.Detail;
        interface All : Detail, List, WithUser;
    }
}