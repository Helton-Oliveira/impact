package com.digisphere.setup.auth.resource

import com.digisphere.setup.auth.dto.LoginRequest
import com.digisphere.setup.auth.dto.RefreshTokenRequest
import com.digisphere.setup.auth.service.AuthService
import jakarta.transaction.Transactional
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Transactional
@RequestMapping("api/auth")
class AuthResource(
    private val authService: AuthService
) {

    @PostMapping("/login")
    fun login(@RequestBody credentials: LoginRequest): ResponseEntity<*> {
        authService.login(credentials)
            .fold(
                onFailure = { err ->
                    err.printStackTrace()
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(err.message)
                },
                onSuccess = { return ResponseEntity.ok().body(it) }
            )
    }

    @PostMapping("/refresh")
    fun refresh(@RequestBody request: RefreshTokenRequest): ResponseEntity<*> {
        authService.refreshToken(request.refreshToken)
            .fold(
                onFailure = { err ->
                    err.printStackTrace()
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(err.message)
                },
                onSuccess = { return ResponseEntity.ok().body(it) }
            )

    }

}