package com.digisphere.setup.user.dto

import com.digisphere.setup.auth.enums.Role
import com.fasterxml.jackson.annotation.JsonView
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import org.hibernate.validator.constraints.Length
import org.hibernate.validator.constraints.br.CPF
import java.io.Serial
import java.io.Serializable
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
    var birthday: String,

    @field:NotNull
    var role: Role,
) : Serializable

data class UserOutput(
    @field:JsonView(Json.List::class)
    val id: Long?,

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

    @field:JsonView(Json.List::class)
    val active: Boolean,

    @field:JsonView(Json.Detail::class)
    val role: Role,

    ) : Serializable {

    @Serial
    private val serialVersionUID: Long = 1L;

    interface Json {
        interface List
        interface Detail : List
        interface WithFile
        interface All : Detail, WithFile
    }
}
