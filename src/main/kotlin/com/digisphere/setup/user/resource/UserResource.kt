package com.digisphere.setup.user.resource

import com.digisphere.setup.user.domain.UserAssociations
import com.digisphere.setup.user.dto.UserInput
import com.digisphere.setup.user.dto.UserOutput
import com.digisphere.setup.user.service.UserService
import jakarta.validation.ConstraintViolationException
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.util.UriComponentsBuilder

@RestController
@RequestMapping("/api/users")
class UserResource(
    private val userService: UserService,
) {

    @PostMapping
    fun create(@RequestBody @Valid input: UserInput, uriBuilder: UriComponentsBuilder): ResponseEntity<UserOutput> =
        userService.create(input)
            .fold(
                onFailure = { error ->
                    val status = when (error) {
                        is ConstraintViolationException -> HttpStatus.CONFLICT
                        else -> HttpStatus.INTERNAL_SERVER_ERROR
                    }
                    ResponseEntity.status(status).body(null)
                },
                onSuccess = { output ->
                    ResponseEntity.created(uriBuilder.path("/api/users/${output?.id}").build().toUri())
                        .body(output)
                }
            )

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): ResponseEntity<UserOutput> =
        userService.getOne(id, setOf(UserAssociations.FILES))
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
            )

    @GetMapping
    fun getAll(
        @PageableDefault(size = 10, sort = ["createdAt"], direction = Sort.Direction.DESC) pagination: Pageable
    ): ResponseEntity<Page<UserOutput>> =
        userService.getAll(pagination)
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
            )


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN, SYSTEM_ADMIN')")
    fun disabled(@PathVariable id: Long): ResponseEntity<UserOutput> =
        userService.disableById(id)
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
            )

    @PostMapping("/request-reset-password")
    fun requestResetPassword(@RequestBody @Valid input: UserInput): ResponseEntity<Boolean> =
        userService.requestPasswordReset(input)
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
            )

    @PostMapping("/reset-password")
    fun confirmPasswordReset(@RequestBody @Valid input: UserInput): ResponseEntity<Boolean> =
        userService.confirmPasswordReset(input)
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
            )

}