package com.digisphere.setup.user.dto

import com.digisphere.setup.auth.enums.Role
import com.digisphere.setup.config.root.BaseInput
import com.digisphere.setup.config.root.BaseOutput
import com.digisphere.setup.file.dto.FileInput
import com.digisphere.setup.file.dto.FileOutput
import com.fasterxml.jackson.annotation.JsonView
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import org.hibernate.validator.constraints.Length
import org.hibernate.validator.constraints.br.CPF
import java.time.Instant

data class UserInput(

    @field:NotBlank
    @field:Length(min = 1, max = 255)
    var firstName: String,

    @field:NotBlank
    @field:Length(min = 1, max = 255)
    var lastName: String,

    @field:NotBlank
    @field:CPF
    @field:Length(max = 11)
    var cpf: String,

    @field:NotBlank
    @field:Length(min = 1, max = 255)
    var password: String,

    @field:NotBlank
    @field:Length(min = 1, max = 255)
    var email: String,

    @field:NotBlank
    @field:Length(min = 1, max = 100)
    var phoneNumber: String,

    var resetKey: String?,
    var resetKeyCreatedAt: Instant?,

    @field:NotNull
    var role: Role,

    var files: MutableList<FileInput?>? = null,

    ) : BaseInput()

data class UserOutput(

    @field:JsonView(Json.List::class)
    val firstName: String,

    @field:JsonView(Json.Detail::class)
    val lastName: String,

    @field:JsonView(Json.Detail::class)
    val cpf: String,

    @field:JsonView(Json.Detail::class)
    val email: String,

    @field:JsonView(Json.Detail::class)
    val phoneNumber: String,

    @field:JsonView(Json.Detail::class)
    val role: Role,

    @field:JsonView(Json.Detail::class)
    val files: List<FileOutput>?,

    @field:JsonView(Json.Detail::class)
    val resetKey: String?,

    @field:JsonView(Json.Detail::class)
    val resetKeyCreatedAt: Instant?,

    ) : BaseOutput() {

    interface Json {
        interface List;
        interface Detail : List;
        interface WithFile : FileOutput.Json.Detail;
        interface All : Detail, WithFile;
    }
}
