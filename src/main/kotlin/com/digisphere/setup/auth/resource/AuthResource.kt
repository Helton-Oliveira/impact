package com.digisphere.setup.auth.resource

import com.digisphere.setup.auth.dto.LoginRequest
import com.digisphere.setup.auth.dto.LoginResponse
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
    fun login(@RequestBody credentials: LoginRequest): ResponseEntity<LoginResponse> {
        authService.login(credentials)
            .fold(
                onFailure = { return ResponseEntity.status(HttpStatus.CONFLICT).body(null) },
                onSuccess = { return ResponseEntity.ok().body(it) }
            )
    }

}