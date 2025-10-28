package com.digisphere.setup.user.resource

import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.digisphere.setup.user.service.UserService
import jakarta.validation.ConstraintViolationException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.util.UriComponentsBuilder

@RestController
@RequestMapping("/api/users")
class UserResource(
    private val userService: UserService,
) {

    @PostMapping
    fun create(@RequestBody @Valid input: UserInput, uriBuilder: UriComponentsBuilder): ResponseEntity<UserOutput> {
        return userService.create(input)
            .fold(
                onFailure = { error ->
                    val status = when (error) {
                        is ConstraintViolationException -> HttpStatus.CONFLICT
                        else -> HttpStatus.INTERNAL_SERVER_ERROR
                    }
                    ResponseEntity.status(status).body(null)
                },
                onSuccess = { output ->
                    ResponseEntity.created(uriBuilder.path("/api/users/${output.id}").build().toUri())
                        .body(output)
                }
            )
    }


}